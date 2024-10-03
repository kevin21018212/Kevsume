export interface ProfileProps {
  name: string;
  title: string;
  description: string;
  setName: (value: string) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
}
export interface ColorSchemeProps {
  colorScheme: { mainColor1: string; mainColor2: string; textColor: string; containerColor: string };
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface LinksProps {
  links: { name: string; href: string }[];
  handleLinkChange: (index: number, field: "name" | "href", value: string) => void;
  handleAddLink: () => void;
  handleRemoveLink: (index: number) => void;
}

export interface Link {
  name: string;
  href: string;
}
