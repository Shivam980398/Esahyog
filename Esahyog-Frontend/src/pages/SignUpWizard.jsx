import { useState } from "react";
import StepOne from "../components/ui/StepOne.jsx";
import StepTwo from "../components/ui/StepTwo.jsx";
import StepThree from "../components/ui/StepThree.jsx";
import LoginPage from "../components/ui/StepZero.jsx";

function SignUpWizard({ initialStep = 1 }) {
  const [step, setStep] = useState(initialStep);

  const goNext = () => setStep((s) => Math.min(4, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="w-full flex flex-col items-center px-4 bg-[url('/src/assets/img/signup-bg.png')] bg-cover bg-center py-5 bg-opacity-50 ">
      <h1 className="text-3xl md:text-4xl font-semibold text-main mb-5 text-center border-b-2 border-accent pb-2">
        {step == 1
          ? "Welcome Dear, Please Login "
          : "Please complete your registration"}
      </h1>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 bg-slate-500/80 rounded-md">
        {step === 1 && <LoginPage onRegister={goNext} />}
        {step === 2 && <StepOne onNext={goNext} onBack={goBack} />}

        {step === 3 && <StepTwo onNext={goNext} onBack={goBack} />}

        {step === 4 && <StepThree onBack={goBack} />}
      </div>

      <div className="flex items-center gap-2 mt-8">
        {[1, 2, 3, 4].map((v) => (
          <span
            key={v}
            className={`h-2.5 w-2.5 rounded-full transition ${
              step === v ? "bg-accent" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default SignUpWizard;
