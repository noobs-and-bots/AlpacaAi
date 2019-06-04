from app import app

def get_file_contents(filename)
    with open(filename, 'r') as mfile:
        content = mfile.read()
        return content