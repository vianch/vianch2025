import os
import glob

def rename_images(folder_path, new_name):
    # Change directory to the target folder
    os.chdir(folder_path)

    # Find all image files in the folder
    image_files = glob.glob("*.[jJ][pP][gG]") + glob.glob("*.[pP][nN][gG]") + \
                  glob.glob("*.[jJ][pP][eE][gG]") + glob.glob("*.[gG][iI][fF]")
    
    # Sort files to ensure consistent ordering
    image_files.sort()

    # Rename each file
    for index, filename in enumerate(image_files):
        # Extract the file extension
        file_extension = os.path.splitext(filename)[1]
        
        # Construct new filename
        new_filename = f"{new_name}-{index + 1}{file_extension}"
        
        # Rename the file
        os.rename(filename, new_filename)
        print(f"Renamed '{filename}' to '{new_filename}'")

# Example usage
folder_path = "./finals"
new_name = "budapest"
rename_images(folder_path, new_name)
