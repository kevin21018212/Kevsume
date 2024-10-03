import { LinksProps } from "@/lib/props";
import styles from "@/styles/Links.module.scss";

export default function Links({ links, handleLinkChange, handleAddLink, handleRemoveLink }: LinksProps) {
  return (
    <div className={styles.linksSection}>
      <h2>Links</h2>
      {links.map((link, index) => (
        <div key={index} className={styles.link}>
          <input
            type="text"
            placeholder="Link Name"
            value={link.name}
            onChange={(e) => handleLinkChange(index, "name", e.target.value)}
            className={styles.input}
          />
          <input
            type="url"
            placeholder="Link URL"
            value={link.href}
            onChange={(e) => handleLinkChange(index, "href", e.target.value)}
            className={styles.input}
          />
          <button onClick={() => handleRemoveLink(index)} className={styles.removeButton}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={handleAddLink} className={styles.addButton}>
        Add Link
      </button>
    </div>
  );
}
