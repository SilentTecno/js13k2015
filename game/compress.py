import subprocess

scripts = []
scripts.append('content/scripts/game.helpers.js')
scripts.append('content/scripts/game.events.js')
scripts.append('content/scripts/game.client.js')
scripts.append('content/scripts/game.canvas.js')
scripts.append('content/scripts/game.player.js')
scripts.append('content/scripts/index.js')
styles = ['content/styles/game.css']

print 'Merging scripts ...'

with open('content/scripts/index.min.js', 'w') as outfile:
    for script in scripts:
        with open(script) as infile:
            outfile.write(infile.read())

print 'Merging styles ...'

with open('content/styles/game.min.css', 'w') as outfile:
    for style in styles:
        with open(style) as infile:
            outfile.write(infile.read())

print 'Minifying scripts ...'

subprocess.call(['java', '-jar', 'yuicompressor-2.4.8.jar', '-o', 'content/scripts/index.min.js', '--type', 'js', 'content/scripts/index.min.js'])

print 'Minifying styles ...'

subprocess.call(['java', '-jar', 'yuicompressor-2.4.8.jar', '-o', 'content/styles/game.min.css', '--type', 'css', 'content/styles/game.min.css'])

# print 'Delete zip files and folder ...'

# subprocess.call(['rm', '-f', 'game_7z.zip'])
# subprocess.call(['rm', '-f', 'game_zip.zip'])
# subprocess.call(['rm', '-rf', 'gameZip'])

# print 'Create zip folder ...'

# subprocess.call(['mkdir', '-p', 'gameZip'])
# subprocess.call(['cp', 'index.html', 'gameZip/index.html'])
# subprocess.call(['mkdir', '-p', 'gameZip/scripts'])
# subprocess.call(['cp', 'scripts/index.min.js', 'gameZip/scripts/index.min.js'])
# subprocess.call(['mkdir', '-p', 'gameZip/styles'])
# subprocess.call(['cp', 'styles/site.min.css', 'gameZip/styles/site.min.css'])
# subprocess.call(['mkdir', '-p', 'gameZip/images'])
# subprocess.call(['cp', '-r', 'images/', 'gameZip/'])
# subprocess.call(['mkdir', '-p', 'gameZip/sfx'])
# subprocess.call(['cp', '-r', 'sfx/', 'gameZip/'])


# print 'Compress ...'

# subprocess.call(['7z', 'a', '-tzip', '-mx9', 'game_7z.zip', 'gameZip'])
# subprocess.call(['zip', '-r9', 'game_zip.zip', 'gameZip'])
# subprocess.call(['rm', '-rf', 'gameZip'])

print 'Done.'
