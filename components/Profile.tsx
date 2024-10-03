import { ProfileProps } from "@/lib/props";
import styles from "./Profile.module.css";

export default function Profile({ name, title, description, setName, setTitle, setDescription }: ProfileProps) {
  return (
    <div className={styles.mainSection}>
      <h1>Resume Creation Page</h1>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Your Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Your Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />
      </div>
    </div>
  );
}
