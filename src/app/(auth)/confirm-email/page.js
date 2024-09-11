export default function ConfirmEmailPage() {
    return (
      <div className="flex flex-col items-center justify-center bg-white rounded-sm px-4 py-7 shadow-md">
        <h1 className="text-4xl font-bold mb-4">Check Your Email</h1>
        <p className="text-xl text-center mb-8">
          We've sent you an email with a link to confirm your account. 
          Please check your inbox and click the link to complete the sign-up process.
        </p>
        <p className="text-md text-gray-600">
          If you don't see the email, check your spam folder.
        </p>
      </div>
    );
  }