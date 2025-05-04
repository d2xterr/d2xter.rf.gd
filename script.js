document.addEventListener('DOMContentLoaded', () => {
    const enterScreen = document.getElementById('enterScreen');
    const mainContent = document.getElementById('mainContent');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const dotsContainer = document.getElementById('dots');

    
    function createDots() {
        const dotCount = 50; 
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            
            
            dot.style.left = `${Math.random() * 100}%`;
            dot.style.top = `${Math.random() * 100}%`;
            
        
            const size = Math.random() * 4 + 2;
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            
            
            dot.style.animationDelay = `${Math.random() * 15}s`;
            
            
            dot.style.opacity = Math.random() * 0.5 + 0.3;
            
            dotsContainer.appendChild(dot);
        }
    }

    async function fetchDiscordInfo() {
        const userId = '1036706701484769321'; 
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
            const data = await response.json();
            
            if (data.success) {
                const user = data.data;

                const avatarUrl = user.discord_user.avatar 
                    ? `https://cdn.discordapp.com/avatars/${userId}/${user.discord_user.avatar}.gif`
                    : `https://cdn.discordapp.com/avatars/${userId}/${user.discord_user.avatar}.png`;
                

                document.getElementById('discordAvatar').src = avatarUrl;
                document.getElementById('discordUsername').textContent = user.discord_user.username;
                

                const statusIndicator = document.getElementById('statusIndicator');
                const statusText = document.getElementById('discordStatus');
                statusIndicator.className = 'status-indicator ' + user.discord_status;
                

                const statusMap = {
                    'online': 'Online',
                    'idle': 'Idle',
                    'dnd': 'Do Not Disturb',
                    'offline': 'Offline'
                };
                statusText.textContent = statusMap[user.discord_status] || user.discord_status;
                

                const activityContainer = document.getElementById('discordActivity');
                if (user.activities && user.activities.length > 0) {
                    const activity = user.activities[0];
                    const activityImage = document.getElementById('activityImage');
                    const activityName = document.getElementById('activityName');
                    const activityDetails = document.getElementById('activityDetails');
                    const activityType = document.getElementById('activityType');
                    

                    if (activity.assets && activity.assets.large_image) {
                        const imageId = activity.assets.large_image.replace('mp:', '');
                        activityImage.src = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${imageId}.png`;
                        activityImage.style.display = 'block';
                    } else {
                        activityImage.style.display = 'none';
                    }
                    
                    
                    activityName.textContent = activity.name;
                    activityDetails.textContent = activity.details || '';
                    
                    
                    const typeMap = {
                        0: 'Playing',
                        1: 'Streaming',
                        2: 'Listening to',
                        3: 'Watching',
                        4: 'Custom',
                        5: 'Competing in'
                    };
                    activityType.textContent = typeMap[activity.type] || '';
                    
                    activityContainer.style.display = 'block';
                } else {
                    activityContainer.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Error fetching Discord data:', error);
        }
    }

    
    enterScreen.addEventListener('click', () => {
        enterScreen.style.opacity = '0';
        setTimeout(() => {
            enterScreen.style.display = 'none';
            mainContent.style.display = 'block';
            
            backgroundMusic.play().catch(error => {
                console.log('Autoplay prevented:', error);
            });
        }, 500);
    });

    
    enterScreen.addEventListener('touchend', (e) => {
        e.preventDefault();
        enterScreen.click();
    });

    
    document.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.log('Autoplay prevented:', error);
            });
        }
    });

    
    const volumeSlider = document.getElementById('volumeSlider');

    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        backgroundMusic.volume = volume;
        
        
        const volumeIcon = document.querySelector('.volume-icon');
        if (volume === 0) {
            volumeIcon.textContent = '🔇';
        } else if (volume < 0.5) {
            volumeIcon.textContent = '🔉';
        } else {
            volumeIcon.textContent = '🔊';
        }
    });


    backgroundMusic.volume = volumeSlider.value / 100;

    
    createDots();
    fetchDiscordInfo();
    
    setInterval(fetchDiscordInfo, 10000);

    
    const title = document.querySelector('.animated-title');
    title.addEventListener('mouseover', () => {
        title.style.transform = 'scale(1.1)';
        title.style.transition = 'transform 0.3s ease';
    });

    title.addEventListener('mouseout', () => {
        title.style.transform = 'scale(1)';
    });
}); 