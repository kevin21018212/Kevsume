export interface ProfileProps {
  name: string;
  title: string;
  description: string;
  setName: (value: string) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
}
export interface ColorSchemeProps {
  colorScheme: {
    mainColor1: string;
    mainColor2: string;
    textColor: string;
    containerColor: string;
  };
  onColorChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface LinksProps {
  links: Link[];
  onLinkChange: (index: number, field: "name" | "href", value: string) => void;
  onAddLink: () => void;
  onRemoveLink: (index: number) => void;
}
export interface Link {
  name: string;
  href: string;
}
