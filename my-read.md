- Prisma

* npm install prisma --save-dev
* npx prisma init
* npx prisma migrate dev --name init (migration oluşturur ve bir isim verir)
* npx prisma generate
* npx prisma studio
* npx prisma db seed --preview-feature

- Tailwindcss

* bg-gradient-to-r (sağa doğru giden bir arka plan) from-indigo-400 (Başlangıç Rengi) to-cyan-400 (devam eden renk) text-transparent (yazıyı şeffaf yap ) bg-clip-text (yazının rengi arka plandaki renk olsun)
* truncate (uzun yazıları kısaltır) ve sonuna üç nokta ekler
* animate-spin (dönme animasyonu) ve animate-ping (yanıp sönen animasyon)
* Flex Grow (w-[400px] max-w-[400px] flex flex-col flex-grow) bu alanda kaplanabilecek olan 400px lik alanı kaplamak için flex-grow kullanıldı kaplanabilir alanın tümünü kaplar

- heropatterns

* https://heropatterns.com/

- DND

* npm install @dnd-kit/core

- React State Management
- usestate için bir arraya eleman eklemek
  setElements((prev) => {
  const newElements = [...prev];
  newElements.splice(index,0 ,element);
         return newElements;
  })
