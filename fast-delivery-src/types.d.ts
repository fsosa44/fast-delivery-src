export interface PayloadAttributes {
  id: Number | null;
  email: string;
  name: string;
  role: string;
  last_name: string;
  status: string;
}

export interface PackageProps {
  address: string | undefined;
  city: string;
  status?: string;
  id: string | undefined;
  setTickedPackages?: Dispatch<SetStateAction<undefined[] | string[]>>;
  tickedPackages?: (string | undefined)[];
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  client_name: string
}
