"use server";
import prisma from '@/lib/prisma';
import { formSchema, formSchemaTye } from '@/schemas/form';
import { currentUser } from '@clerk/nextjs/server';

class UserNotFoundError extends Error {}


export async function GetFormStats() {
    const user = await currentUser();

    if(!user) {
        throw new UserNotFoundError('User not found');
    }

    const stats = prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = (await stats)._sum.visits || 0
    const submissions = (await stats)._sum.submissions || 0

    const submissionsRate = visits > 0 ? (submissions / visits) * 100 : 0

    const bounceRate = 100 - submissionsRate;

    return {
        visits, submissions, submissionsRate, bounceRate
    }

}

export async function CreateFrom(data: formSchemaTye) {
    const validation = formSchema.safeParse(data);
    if(!validation.success) {
        throw new Error('Beklenmeyen bir hata oluştu lütfen tekrar deneyin.');
    }

    const user = await currentUser(); 

    if(!user) {
        throw new UserNotFoundError('User not found');
    }

    const { name, description } = data;
    
    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name,
            description
        }
    })

    if(!form) {
        throw new Error('Beklenmeyen bir hata oluştu lütfen tekrar deneyin.');
    }


    return form.id;
 
}

export async function GetForms() {
    const user = await currentUser();
    
    if(!user) {
        throw new UserNotFoundError();
    }

    return await prisma.form.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

}

export async function GetFormById(id: number) {
    const user = await currentUser();

    if(!user) {
        throw new UserNotFoundError();
    }

    return await prisma.form.findFirst({
        where: {
            userId: user.id,
            id
        }
    })
}