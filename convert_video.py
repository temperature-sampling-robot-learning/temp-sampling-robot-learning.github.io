from moviepy.editor import VideoFileClip
import os
import glob

def convert_video(input_path, output_path):
    try:
        # Load the video
        video = VideoFileClip(input_path)
        
        # Write the video with web-friendly settings
        video.write_videofile(
            output_path,
            codec='libx264',
            audio_codec='aac',
            temp_audiofile='temp-audio.m4a',
            remove_temp=True,
            fps=30
        )
        
        # Close the video
        video.close()
        print(f"Successfully converted {input_path} to {output_path}")
        
        # Delete original file after successful conversion
        os.remove(input_path)
        print(f"Deleted original file: {input_path}")
        
    except Exception as e:
        print(f"Error converting video: {e}")

def process_directory(directory):
    # Get all video files in the directory and its subdirectories
    video_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.mp4', '.mov')) and '_web' not in file:
                video_files.append(os.path.join(root, file))
    
    if not video_files:
        print(f"No unconverted videos found in {directory}")
        return
        
    print(f"\nFound {len(video_files)} unconverted videos in {directory}")
    
    for video_file in video_files:
        # Create output filename
        base_name = os.path.splitext(video_file)[0]
        output_file = f"{base_name}_web.mp4"
        
        # Skip if web version already exists
        if os.path.exists(output_file):
            print(f"Skipping {video_file} - web version already exists")
            continue
            
        print(f"Converting {video_file}...")
        convert_video(video_file, output_file)

def main():
    # List of all task directories
    task_dirs = [
        "./static/videos/fold",
        "./static/videos/slide",
        "./static/videos/egg_carton",
        "./static/videos/pen_in_cup",
        "./static/videos/press_button"
    ]
    
    # Process each directory
    for directory in task_dirs:
        print(f"\nProcessing {directory}...")
        process_directory(directory)

if __name__ == "__main__":
    main() 