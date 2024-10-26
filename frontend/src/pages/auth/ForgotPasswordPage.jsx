import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 tablet:px-6 laptop:px-8">
      <div className="tablet:mx-auto tablet:w-full tablet:max-w-md">
        <img className="mx-auto h-40 w-auto" src="/logo.svg" alt="LinkedIn" />
        <h2 className=" text-center text-3xl font-extrabold text-gray-900">
          Password Recovery
        </h2>
      </div>

      <div className="mt-8 tablet:mx-auto tablet:w-full tablet:max-w-md shadow-md">
        <div className="bg-white py-8 px-4 shadow tablet:rounded-lg tablet:px-10">
          <ForgotPasswordForm />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
