export interface PayloadAttributes {
  id: Number | null;
  email: string;
  name: string;
  role: string;
  last_name: string;
  status: string;
}

export interface PackageProps {
  address: string;
  city: string;
  status?: string;
  id: string | undefined;
  setTickedPackages: React.Dispatch<React.SetStateAction<never[]>>;
  tickedPackages: never[];
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
