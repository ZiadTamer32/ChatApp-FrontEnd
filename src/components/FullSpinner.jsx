import { Loader } from "lucide-react";
const FullSpinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader className="size-10 animate-spin" />
    </div>
  );
};

export default FullSpinner;
