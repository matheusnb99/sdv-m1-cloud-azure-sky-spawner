This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Monitoring

**Sup De Vinci 2022-2023**  
**MSI 4-24- DEV A Cloud Course**  
_Deliverable to be produced_  
_Individual Work_

## Project Description

The project involves the creation of a web application so that developers can easily have disposable environments for testing and evaluating their software. The idea is that a developer who wants to test his application under Windows 11 for example, can come to our web application, create and easily access a Windows 11 via RDP, without having to worry about the details of the virtual machine. He simply orders a Windows machine, tests his application, and logs out.

## Expected Work

- A website that allows a developer to easily have a platform to test their programs.
- The website must require authentication:
  - Plan for 3 pre-configured users.
  - The logins and passwords of the users are mentioned in the documentation.
  - One user should not have any credits, so they can't do anything.
  - One user should have access to only one pre-configured machine.
  - One user should have access to multiple operating systems and can choose which one they start.
- When a registered user launches a machine, the website creates it on the Azure portal, and provides the user with connection parameters (RDP and/or SSH).
- The user has 10 minutes to connect to their machine before it is automatically destroyed.
- As a bonus, it should be possible to provide Linux machines that can be accessed in graphic mode (possibly with the VNC protocol).
- There are no prerequisites in terms of language. You can use the language or framework of your choice.
- The source code must be documented.

## Deliverables

- The project must be installable by following your installation documentation, on a Linux Debian or Ubuntu distribution in server mode (without graphical interface).
- The project is submitted in the form of a zip or tar, or tar.gz or tar.bz2 or tar.xz archive. No rar.

### Content

- The project must include documentation that is easily readable to:
  - Install the project on the trainer's machine.
  - Configure the project with the Azure identifiers of the trainer (SubscriptionID and company).
- The project must also present the source code of the project.
- Under no circumstances should your project ask to clone a repository.

## Grading

You will be graded on the following points:

- Installation documentation.
- Documentation for configuring Azure account information (application id, secret, etc.).
- The installation itself.
- Software functionality:
  - Testing the 3 pre-registered users.
  - No need to provide a registration procedure.
  - The creation and deletion of the ordered machine. The machine must be destroyed without manual intervention after 10 minutes.

If a project is carried out by several students, the grade will be divided by the number of students. Whether this is clearly announced or I realize it during the correction.

## Dates

- **July 20, 2023**: Delivery via Pepal. Any delivery after this date will be penalized.
