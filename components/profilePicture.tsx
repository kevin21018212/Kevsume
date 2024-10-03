import { ProfilePictureProps } from "@/lib/props";
import styles from "@/styles/profilePicture.module.scss";

export default function ProfilePictureSection({ handleFileChange, profilePictureUrl }: ProfilePictureProps) {
  return (
    <div className={styles.profilePictureSection}>
      <h2>Profile Picture</h2>
      {profilePictureUrl ? (
        <img src={profilePictureUrl} alt="Profile Picture" className={styles.profileImage} />
      ) : (
        <div className={styles.placeholder}>No Profile Picture</div>
      )}
      <input type="file" onChange={handleFileChange} accept="image/*" className={styles.fileInput} />
    </div>
  );
}
