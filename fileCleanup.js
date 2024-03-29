const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

function deleteOldFiles() {
    const directory = './upload/images';
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        files.forEach(file => {
            const filePath = path.join(directory, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }
                const currentTime = new Date().getTime();
                const fileCreationTime = stats.birthtime.getTime();
                const timeDifference = currentTime - fileCreationTime;
                const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Calculate difference in hours
                if (hoursDifference >= 15) { // Delete files older than 15 hours
                    fs.unlink(filePath, err => {
                        if (err) {
                            console.error('Error deleting file:', err);
                            return;
                        }
                        console.log(`Deleted file: ${filePath}`);
                    });
                }
            });
        });
    });
}

// Schedule the task to run every 15 hours
cron.schedule('0 0 */10 * *', () => {
    console.log('Running file cleanup task...');
    deleteOldFiles();
});

console.log('File cleanup task scheduled to run every 15 hours.');
