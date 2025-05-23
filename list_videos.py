import os
import json
from pathlib import Path
import re

def get_videos_for_task(task_dir):
    task_videos = {}
    task_path = Path(f'static/videos/{task_dir}')
    
    if not task_path.exists():
        print(f"Directory {task_path} does not exist")
        return None
        
    # Get all method directories
    method_dirs = [d for d in task_path.iterdir() if d.is_dir()]
    
    for method_dir in method_dirs:
        method_name = method_dir.name
        videos = []
        
        # Get all web-optimized videos
        for video_file in method_dir.glob('*.mp4'):
            videos.append(video_file.name)
            
        if videos:
            task_videos[method_name] = sorted(videos)
            
    return task_videos

def main():
    tasks = ['fold', 'slide', 'egg_carton', 'pen_in_cup']
    all_tasks = {}
    
    for task in tasks:
        task_videos = get_videos_for_task(task)
        if task_videos:
            all_tasks[task] = task_videos
    
    # Print in JavaScript object format
    print("const taskVideos = {")
    for task, methods in all_tasks.items():
        print(f"  '{task}': {{")
        for method, videos in methods.items():
            print(f"    '{method}': [")
            for video in videos:
                print(f"      '{video}',")
            print("    ],")
        print("  },")
    print("};")

def rename_videos_in_folders(root_dir):
    """
    Renames video files in subdirectories of root_dir.
    The new name format is demo_{num}_success/failure.ext,
    where {num} is a 1-based index for videos within that specific folder.
    """
    # Walk through all directories
    for subdir, dirs, files in os.walk(root_dir):
        # Filter for video files (assuming common video extensions)
        video_files = sorted([f for f in files if f.lower().endswith(('.mp4', '.avi', '.mov', '.mkv', '.webm'))]) # Added .webm

        if not video_files:
            continue

        print(f"Processing folder: {subdir}")
        video_counter_in_folder = 1 # Reset counter for each folder

        for video_file in video_files:
            # Determine if it's a success or failure video
            # We'll assume 'success' if "success" is in the name, otherwise 'failure'
            # You might need to adjust this logic if your original names are different
            is_success = 'success' in video_file.lower()
            outcome = 'success' if is_success else 'failure'

            # Get the file extension
            _, extension = os.path.splitext(video_file)

            # Create new filename
            new_name = f"demo_{video_counter_in_folder}_{outcome}{extension}"

            # Full paths for old and new files
            old_path = os.path.join(subdir, video_file)
            new_path = os.path.join(subdir, new_name)

            # Avoid renaming if the name is already correct
            if old_path == new_path:
                print(f"Skipped (already named correctly): {video_file}")
                video_counter_in_folder += 1
                continue

            # Rename the file
            try:
                os.rename(old_path, new_path)
                print(f"  Renamed: {video_file} -> {new_name}")
                video_counter_in_folder += 1
            except FileExistsError:
                print(f"  Error: {new_name} already exists. Could not rename {video_file}.")
            except Exception as e:
                print(f"  Error renaming {video_file}: {str(e)}")
        print("-" * 20)

if __name__ == "__main__":
    # Replace this with your root directory path containing the video folders
    # For example, if your videos are in folders inside "./static/videos/"
    # like "./static/videos/folder1/", "./static/videos/folder2/", etc.
    target_root_directory = "./static/videos/"

    if not os.path.isdir(target_root_directory):
        print(f"Error: Root directory '{target_root_directory}' not found.")
    else:
        rename_videos_in_folders(target_root_directory)
        print("Video renaming process complete.") 