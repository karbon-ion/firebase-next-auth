This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Authenticated using [Firebase-Console](https://console.firebase.google.com) and Localized using [Next-Intl's](https://next-intl-docs.vercel.app) app routing

## Getting Started

Create a .en.local file in the root of the directory with the following content 

```bash
NEXT_PUBLIC_FIREBASE_API_KEY = "your firebase API hey here"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "your fire base Auth Domain here"
NEXT_PUBLIC_FIREBASE_PROJECT_ID = "your forebase Project Id here"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "your forebase Storage Bucket here"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "your firebase Messaging Sender Id here"
NEXT_PUBLIC_FIREBASE_APP_ID = "your firebase App Id here"
```


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, Firebase and Next-Intl, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Learn FireBase](https://firebase.google.com/) - learn about Firebase Authentication
- [Learn Next-Intl](https://next-intl-docs.vercel.app/) - learn about Localization/Internationalization using Next-Intl Library 

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
