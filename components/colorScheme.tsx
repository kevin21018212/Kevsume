import { ColorSchemeProps } from "@/lib/props"; // Import your props interface
import styles from "./colorScheme.module.scss";

export default function ColorScheme({ colorScheme, handleColorChange }: ColorSchemeProps) {
  return (
    <div className={styles.colorSchemeSection}>
      <h2>Color Scheme</h2>
      <div className={styles.colorDisplay}>
        <div className={styles.colorPicker}>
          <label>Main Color 1</label>
          <input
            type="color"
            name="mainColor1"
            value={colorScheme.mainColor1}
            onChange={handleColorChange}
            className={styles.colorInput}
          />
        </div>

        <div className={styles.colorPicker}>
          <label>Main Color 2</label>
          <input
            type="color"
            name="mainColor2"
            value={colorScheme.mainColor2}
            onChange={handleColorChange}
            className={styles.colorInput}
          />
        </div>

        <div className={styles.colorPicker}>
          <label>Text Color</label>
          <input
            type="color"
            name="textColor"
            value={colorScheme.textColor}
            onChange={handleColorChange}
            className={styles.colorInput}
          />
        </div>

        <div className={styles.colorPicker}>
          <label>Container Color</label>
          <input
            type="color"
            name="containerColor"
            value={colorScheme.containerColor}
            onChange={handleColorChange}
            className={styles.colorInput}
          />
        </div>
      </div>
    </div>
  );
}
