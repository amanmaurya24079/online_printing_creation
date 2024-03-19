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
                const fileCreationTime = stats.birthtime.getTime(); // Use birthtime for creation time
                const timeDifference = currentTime - fileCreationTime;
                const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Calculate difference in minutes
                if (minutesDifference >= 1) { // Delete files older than 1 minute for testing
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
cron.schedule('* * * * *', () => {
    console.log('Running file cleanup task...');
    deleteOldFiles();
});

console.log('File cleanup task scheduled to run every minute for testing.');