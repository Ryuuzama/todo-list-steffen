This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, download the newest version of Node.js here: https://nodejs.org/en

Then run this code in your vscode terminal:

```bash
npx create-next-app@latest
```

That creates a new next.js project. You will be shown a ton of options. For this project I said yes to typescript, ESLint, Tailwind CSS, and the App Router. I said no to using a src directory, the Turbopack, and changing the import alias.

run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Sometimes the port will be 3001 instead of 3000, so just check the console if it give you a 404 error.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Note:
I also used something called DaisyUI to make using tailwind even simpler and give me more options to choose from, such as using themes. To see how you import it into a next.js project, see this website:

https://daisyui.com/blog/install-daisyui-and-tailwindcss-in-nextjs/

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

First connect your project to git.

```bash
git init
```

then go to github.com and create a new repository on your account. You can then copy the repository link and connect it to your project by making your repository the origin:

```bash
git remote add origin <your-repository-link>
```

Once it is linked, commit and push your changes to your repository. (You can do this on the left-hand side of vscode in the source control tab).

Once it has been updated on github, go back to vercel and find the giant box that says "Import Git Repository" and click import on your repository name. If you don't see your repository name, you might have to change app permissions. There is a button under the import tab that says "adjust GitHub App Permissions. You can manually select your repository to have permission to be used by vercel there.

Once you click import, you can literally just click "deploy" and it will build your application for you and give you a free domain that is publically accessbile.

## Connect Database using Prisma and Supabase

### Setting up Prisma

run this command to download prisma:

```bash
npx prisma init
```

This will create a prisma folder with a default "Schema" (the schema.prisma file) where you can design "models" that act as structures for tables in your future database. You can also specify what client you will use in the generator client block (in this case we are using primsa-client-js because we using javascript/typescript). Below that you'll see the datasource block where you specify what database you'll use (in this case "postgresql"), and other variables for connecting to the database, such as the database URL. Finally you can implement your "models" which is where you will define your tables structure (in this case "Task").

In the package.json file, make sure to add in the "build" section of "scripts" the line "prisma generate" so it look like this:

```bash
"scripts": {
    "dev": "npx prisma generate && next dev",
    "build": "npx prisma generate && next build",
    "start": "next start",
    "lint": "next lint"
  },
```

prisma will not be generated when you actually build it in deployment, so you have to code that in here so it calls it everytime it is built.

This is how it works in the backend:

To create a task, you can use this method:

```bash
    const newTask = await prisma.task.create({
      data: { title, description },
    });
```

this ".create()" method will take the data and actually make a task in the database. The primsa client has lots of functions like these. In the backend we use ".update()", ".findMany()", ".delete()", and ".findUnique()". However, ".delete()" isn't actually used since we will never actually delete a task - instead we just mark it as deleted and not show it.

### Setting up Supabase

Head over to supabase.com and you can click "start project" and begin the setup process. You'll name your database and specify a region. But the most important part here is that you'll generate a password. This will be used for your connection string so prisma can connect to your database.

Once you finish that setup you'll see a button at the top that says "Connect". Click it and it'll give you the options to connect. Since we are using Vercel, which uses IPv4, we have to go with a session pooler type of connection. Take the connection string given you there and go into your ".env" file and past it in quotes after the DATABASE_URL constant. It should look something like this:

```bash
DATABASE_URL="postgresql://postgres.cjeniewvmwgvifcmcafc:6<YOURPASSWORD>@aws-0-us-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
```

### Connecting Prisma and Supabase

Once you have your schema and database all set up, we have to run this command to migrate the table and data.

```bash
npx prisma migrate dev --name init
```

this creates a unique migrations and applies it to our database and it generates the prisma client.

Note:
When you run your code, you'll see another file appear called prisma.tsx that is generated from the "generator client block" that I mentioned earlier. This just is there to keep prisma from making multiple instances, and makes a new one if one isn't currently running.

and with that you should be ready to go! You should now be able to go to the free domain that vercel provides and interact with the task app, performing all the CRUD functions and see it reflected perfectly in the database!
