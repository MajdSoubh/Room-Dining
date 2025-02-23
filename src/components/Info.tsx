import { Info as InfoIcon } from "lucide-react";

interface InfoProps {
  title: string;
  message: string;
}

export const Info: React.FC<InfoProps> = ({ title, message }) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center">
      <InfoIcon className="h-8 w-8 text-primary" />
      <h3 className="text-lg font-medium text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};
