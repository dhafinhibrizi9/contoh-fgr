// Aplikasi Instagram Lite dengan Penyimpanan Data Posting
document.addEventListener('DOMContentLoaded', function() {
    // Data awal aplikasi
    let userData = JSON.parse(localStorage.getItem('instagramUserData')) || {
        id: 1,
        username: "johndoe",
        fullName: "John Doe",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        bio: "Fotografer amatir | Pecinta alam | Travel enthusiast",
        location: "Jakarta, Indonesia",
        website: "johndoe-portfolio.com",
        joinDate: "2022-06-15",
        followers: 450,
        following: 380
    };
    
    let posts = JSON.parse(localStorage.getItem('instagramPosts')) || [
        {
            id: 1,
            userId: 1,
            imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            caption: "Senja yang indah di pantai selatan. Alam selalu memberikan kedamaian tersendiri. #senja #pantai #alam",
            location: "Pantai Pandawa, Bali",
            tags: ["senja", "pantai", "alam", "indonesia", "travel"],
            likes: 125,
            comments: [
                {id: 1, userId: 2, username: "sarah_m", text: "Wow indah sekali!", time: "2h"},
                {id: 2, userId: 3, username: "traveler_joe", text: "Lokasi mana ini?", time: "3h"}
            ],
            isLiked: false,
            isSaved: false,
            allowComments: true,
            hideLikes: false,
            albumId: 1,
            createdAt: "2023-08-15T14:30:00"
        },
        {
            id: 2,
            userId: 1,
            imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            caption: "Mendaki gunung memberikan perspektif baru tentang kehidupan. #gunung #petualangan #alam",
            location: "Gunung Merapi, Jawa Tengah",
            tags: ["gunung", "petualangan", "alam", "hiking", "indonesia"],
            likes: 89,
            comments: [
                {id: 3, userId: 4, username: "mountain_lover", text: "Keren banget! Tingginya berapa?", time: "1d"}
            ],
            isLiked: true,
            isSaved: true,
            allowComments: true,
            hideLikes: false,
            albumId: 2,
            createdAt: "2023-08-10T09:15:00"
        },
        {
            id: 3,
            userId: 2,
            imageUrl: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            caption: "Momen kebersamaan dengan keluarga adalah harta yang tak ternilai. #keluarga #kebersamaan #cinta",
            location: "Rumah",
            tags: ["keluarga", "kebersamaan", "cinta", "moment"],
            likes: 210,
            comments: [
                {id: 4, userId: 1, username: "johndoe", text: "Keluarga yang bahagia!", time: "5h"},
                {id: 5, userId: 3, username: "traveler_joe", text: "Lengkap sekali!", time: "6h"}
            ],
            isLiked: false,
            isSaved: false,
            allowComments: true,
            hideLikes: false,
            albumId: null,
            createdAt: "2023-08-05T16:45:00"
        }
    ];
    
    let albums = JSON.parse(localStorage.getItem('instagramAlbums')) || [
        {id: 1, name: "Liburan", cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", postCount: 1},
        {id: 2, name: "Petualangan", cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", postCount: 1},
        {id: 3, name: "Keluarga", cover: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", postCount: 0}
    ];
    
    let stories = JSON.parse(localStorage.getItem('instagramStories')) || [
        {id: 1, userId: 1, username: "johndoe", avatar: userData.avatar, hasNew: true},
        {id: 2, userId: 2, username: "sarah_m", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80", hasNew: true},
        {id: 3, userId: 3, username: "traveler_joe", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80", hasNew: false},
        {id: 4, userId: 4, username: "mountain_lover", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80", hasNew: true}
    ];
    
    let suggestions = JSON.parse(localStorage.getItem('instagramSuggestions')) || [
        {id: 5, username: "foodie_indonesia", fullName: "Foodie Indonesia", avatar: "https://images.unsplash.com/photo-1555959910-59d0370c2c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"},
        {id: 6, username: "streetphotography", fullName: "Street Photography", avatar: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"},
        {id: 7, username: "nature_world", fullName: "Nature World", avatar: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"}
    ];
    
    // Variabel state aplikasi
    let currentPage = "home";
    let currentStep = 1;
    let selectedPostId = null;
    let uploadFiles = [];
    let tags = [];
    let darkMode = localStorage.getItem('darkMode') === 'true';
    
    // Elemen DOM
    const homePage = document.getElementById('homePage');
    const explorePage = document.getElementById('explorePage');
    const profilePage = document.getElementById('profilePage');
    const uploadPage = document.getElementById('uploadPage');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('themeToggle');
    const photoFeed = document.getElementById('photoFeed');
    const storiesList = document.getElementById('storiesList');
    const suggestionsList = document.getElementById('suggestionsList');
    const trendingTags = document.getElementById('trendingTags');
    const exploreGrid = document.getElementById('exploreGrid');
    const profilePosts = document.getElementById('profilePosts');
    const profileAlbums = document.getElementById('profileAlbums');
    const savedPosts = document.getElementById('savedPosts');
    const taggedPosts = document.getElementById('taggedPosts');
    const profileTabs = document.querySelectorAll('.profile-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const userPostCount = document.getElementById('userPostCount');
    const userFollowerCount = document.getElementById('userFollowerCount');
    const userFollowingCount = document.getElementById('userFollowingCount');
    const postModal = document.getElementById('postModal');
    const closeModal = document.querySelector('.close-modal');
    const modalPostImage = document.getElementById('modalPostImage');
    const modalUsername = document.getElementById('modalUsername');
    const modalUserLocation = document.getElementById('modalUserLocation');
    const modalUserAvatar = document.getElementById('modalUserAvatar');
    const modalPostCaption = document.getElementById('modalPostCaption');
    const modalPostTags = document.getElementById('modalPostTags');
    const modalPostTime = document.getElementById('modalPostTime');
    const modalLikeBtn = document.getElementById('modalLikeBtn');
    const modalSaveBtn = document.getElementById('modalSaveBtn');
    const modalLikeCount = document.getElementById('modalLikeCount');
    const modalCommentsList = document.getElementById('modalCommentsList');
    const commentInput = document.getElementById('commentInput');
    const submitCommentBtn = document.getElementById('submitCommentBtn');
    const uploadArea = document.getElementById('uploadArea');
    const photoUpload = document.getElementById('photoUpload');
    const uploadPreview = document.getElementById('uploadPreview');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const stepIndicators = document.querySelectorAll('.step-dot');
    const uploadSteps = document.querySelectorAll('.upload-step');
    const editImage = document.getElementById('editImage');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const brightnessSlider = document.getElementById('brightnessSlider');
    const contrastSlider = document.getElementById('contrastSlider');
    const postCaption = document.getElementById('postCaption');
    const charCount = document.getElementById('charCount');
    const postLocation = document.getElementById('postLocation');
    const tagInput = document.getElementById('tagInput');
    const tagsDisplay = document.getElementById('tagsDisplay');
    const allowComments = document.getElementById('allowComments');
    const hideLikes = document.getElementById('hideLikes');
    const saveToAlbum = document.getElementById('saveToAlbum');
    const postAlbum = document.getElementById('postAlbum');
    const createAlbumBtn = document.getElementById('createAlbumBtn');
    const albumSelectionGroup = document.getElementById('albumSelectionGroup');
    const searchInput = document.getElementById('searchInput');
    const toastContainer = document.getElementById('toastContainer');
    
    // Inisialisasi aplikasi
    initApp();
    
    // Fungsi inisialisasi
    function initApp() {
        // Set tema awal
        if (darkMode) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Render data awal
        renderStories();
        renderFeed();
        renderSuggestions();
        renderTrendingTags();
        renderExplore();
        renderProfilePosts();
        renderProfileAlbums();
        renderSavedPosts();
        renderAlbumOptions();
        updateUserStats();
        
        // Event listeners
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                switchPage(link.dataset.page);
            });
        });
        
        themeToggle.addEventListener('click', toggleTheme);
        closeModal.addEventListener('click', () => postModal.style.display = 'none');
        modalLikeBtn.addEventListener('click', toggleLike);
        modalSaveBtn.addEventListener('click', toggleSave);
        submitCommentBtn.addEventListener('click', addComment);
        
        // Event untuk upload
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        photoUpload.addEventListener('change', handleFileSelect);
        nextStepBtn.addEventListener('click', goToNextStep);
        prevStepBtn.addEventListener('click', goToPrevStep);
        
        // Event untuk edit foto
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
        });
        
        brightnessSlider.addEventListener('input', updateImageFilters);
        contrastSlider.addEventListener('input', updateImageFilters);
        
        // Event untuk detail postingan
        postCaption.addEventListener('input', updateCharCount);
        tagInput.addEventListener('keydown', handleTagInput);
        saveToAlbum.addEventListener('change', toggleAlbumSelection);
        createAlbumBtn.addEventListener('click', createNewAlbum);
        
        // Event untuk pencarian
        searchInput.addEventListener('input', handleSearch);
        
        // Event untuk klik di luar modal
        window.addEventListener('click', (e) => {
            if (e.target === postModal) {
                postModal.style.display = 'none';
            }
        });
        
        // Event untuk tab profil
        profileTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                switchProfileTab(tabId);
            });
        });
        
        // Event untuk enter pada komentar
        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addComment();
            }
        });
    }
    
    // Switch halaman
    function switchPage(page) {
        currentPage = page;
        
        // Update navigasi
        navLinks.forEach(link => {
            if (link.dataset.page === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Sembunyikan semua halaman
        homePage.classList.remove('active');
        explorePage.classList.remove('active');
        profilePage.classList.remove('active');
        uploadPage.classList.remove('active');
        
        // Tampilkan halaman aktif
        switch(page) {
            case 'home':
                homePage.classList.add('active');
                break;
            case 'explore':
                explorePage.classList.add('active');
                break;
            case 'profile':
                profilePage.classList.add('active');
                renderProfileData();
                break;
            case 'upload':
                uploadPage.classList.add('active');
                resetUploadForm();
                break;
        }
    }
    
    // Toggle tema gelap/terang
    function toggleTheme() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode');
        
        if (darkMode) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('darkMode', darkMode);
    }
    
    // Render stories
    function renderStories() {
        storiesList.innerHTML = '';
        
        stories.forEach(story => {
            const storyItem = document.createElement('div');
            storyItem.className = 'story-item';
            
            storyItem.innerHTML = `
                <div class="story-avatar ${story.hasNew ? 'has-new' : ''}">
                    <img src="${story.avatar}" alt="${story.username}">
                </div>
                <span class="story-username">${story.username}</span>
            `;
            
            storiesList.appendChild(storyItem);
        });
    }
    
    // Render feed postingan
    function renderFeed() {
        photoFeed.innerHTML = '';
        
        // Sort postingan berdasarkan tanggal (terbaru dulu)
        const sortedPosts = [...posts].sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        sortedPosts.forEach(post => {
            const postCard = createPostCard(post);
            photoFeed.appendChild(postCard);
        });
    }
    
    // Render saran akun
    function renderSuggestions() {
        suggestionsList.innerHTML = '';
        
        suggestions.forEach(user => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            
            suggestionItem.innerHTML = `
                <div class="suggestion-user">
                    <img src="${user.avatar}" alt="${user.username}">
                    <div class="suggestion-info">
                        <h4>${user.username}</h4>
                        <p>${user.fullName}</p>
                    </div>
                </div>
                <button class="follow-btn" data-user-id="${user.id}">Ikuti</button>
            `;
            
            suggestionsList.appendChild(suggestionItem);
        });
        
        // Event untuk tombol ikuti
        document.querySelectorAll('.follow-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.dataset.userId;
                this.textContent = this.textContent === 'Ikuti' ? 'Mengikuti' : 'Ikuti';
                this.classList.toggle('following');
            });
        });
    }
    
    // Render tag trending
    function renderTrendingTags() {
        trendingTags.innerHTML = '';
        
        // Ambil tag dari semua postingan
        const allTags = posts.flatMap(post => post.tags);
        const tagCounts = {};
        
        // Hitung frekuensi tag
        allTags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        
        // Ambil 5 tag terpopuler
        const topTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(entry => entry[0]);
        
        topTags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'trending-tag';
            tagElement.textContent = `#${tag}`;
            tagElement.addEventListener('click', () => {
                searchInput.value = `#${tag}`;
                switchPage('explore');
                handleSearch();
            });
            
            trendingTags.appendChild(tagElement);
        });
    }
    
    // Render halaman jelajahi
    function renderExplore() {
        exploreGrid.innerHTML = '';
        
        posts.forEach(post => {
            const exploreItem = document.createElement('div');
            exploreItem.className = 'explore-item';
            
            exploreItem.innerHTML = `
                <img src="${post.imageUrl}" alt="Explore">
                <div class="explore-overlay">
                    <div class="post-stats">
                        <span><i class="fas fa-heart"></i> ${post.likes}</span>
                        <span><i class="fas fa-comment"></i> ${post.comments.length}</span>
                    </div>
                </div>
            `;
            
            exploreItem.addEventListener('click', () => {
                showPostModal(post.id);
            });
            
            exploreGrid.appendChild(exploreItem);
        });
    }
    
    // Render postingan profil
    function renderProfilePosts() {
        profilePosts.innerHTML = '';
        
        // Filter postingan milik user
        const userPosts = posts.filter(post => post.userId === userData.id);
        
        if (userPosts.length === 0) {
            profilePosts.innerHTML = `
                <div class="empty-profile">
                    <i class="fas fa-camera"></i>
                    <h3>Belum ada postingan</h3>
                    <p>Bagikan foto pertama Anda!</p>
                </div>
            `;
            return;
        }
        
        userPosts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.className = 'profile-post-item';
            
            postItem.innerHTML = `
                <img src="${post.imageUrl}" alt="Post">
                <div class="post-overlay">
                    <span><i class="fas fa-heart"></i> ${post.likes}</span>
                    <span><i class="fas fa-comment"></i> ${post.comments.length}</span>
                </div>
            `;
            
            postItem.addEventListener('click', () => {
                showPostModal(post.id);
            });
            
            profilePosts.appendChild(postItem);
        });
    }
    
    // Render album profil
    function renderProfileAlbums() {
        profileAlbums.innerHTML = '';
        
        albums.forEach(album => {
            const albumCard = document.createElement('div');
            albumCard.className = 'album-card';
            
            albumCard.innerHTML = `
                <div class="album-cover">
                    <img src="${album.cover}" alt="${album.name}">
                </div>
                <div class="album-info">
                    <h4>${album.name}</h4>
                    <p>${album.postCount} foto</p>
                </div>
            `;
            
            profileAlbums.appendChild(albumCard);
        });
    }
    
    // Render postingan disimpan
    function renderSavedPosts() {
        savedPosts.innerHTML = '';
        
        // Filter postingan yang disimpan
        const savedPostsList = posts.filter(post => post.isSaved);
        
        if (savedPostsList.length === 0) {
            savedPosts.innerHTML = `
                <div class="empty-profile">
                    <i class="fas fa-bookmark"></i>
                    <h3>Belum ada yang disimpan</h3>
                    <p>Simpan postingan untuk dilihat nanti</p>
                </div>
            `;
            return;
        }
        
        savedPostsList.forEach(post => {
            const postItem = document.createElement('div');
            postItem.className = 'profile-post-item';
            
            postItem.innerHTML = `
                <img src="${post.imageUrl}" alt="Post">
                <div class="post-overlay">
                    <span><i class="fas fa-heart"></i> ${post.likes}</span>
                    <span><i class="fas fa-comment"></i> ${post.comments.length}</span>
                </div>
            `;
            
            postItem.addEventListener('click', () => {
                showPostModal(post.id);
            });
            
            savedPosts.appendChild(postItem);
        });
    }
    
    // Render opsi album
    function renderAlbumOptions() {
        postAlbum.innerHTML = '<option value="">Pilih album...</option>';
        
        albums.forEach(album => {
            const option = document.createElement('option');
            option.value = album.id;
            option.textContent = album.name;
            postAlbum.appendChild(option);
        });
    }
    
    // Update statistik user
    function updateUserStats() {
        const userPostsCount = posts.filter(post => post.userId === userData.id).length;
        userPostCount.textContent = userPostsCount;
        userFollowerCount.textContent = userData.followers;
        userFollowingCount.textContent = userData.following;
    }
    
    // Buat kartu postingan
    function createPostCard(post) {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        // Cari data user yang memposting
        const postUser = post.userId === userData.id ? userData : 
            suggestions.find(u => u.id === post.userId) || 
            stories.find(u => u.id === post.userId);
        
        const likeIcon = post.isLiked ? 'fas fa-heart' : 'far fa-heart';
        const saveIcon = post.isSaved ? 'fas fa-bookmark' : 'far fa-bookmark';
        const likeBtnClass = post.isLiked ? 'like-btn active' : 'like-btn';
        const saveBtnClass = post.isSaved ? 'save-btn active' : 'save-btn';
        
        postCard.innerHTML = `
            <div class="post-header">
                <div class="post-user">
                    <img src="${postUser.avatar}" alt="${postUser.username}">
                    <div class="post-user-info">
                        <h4>${postUser.username}</h4>
                        <p>${post.location || ''}</p>
                    </div>
                </div>
                <button class="icon-btn"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.imageUrl}" alt="Post" class="post-image">
            <div class="post-actions">
                <div class="action-left">
                    <button class="icon-btn ${likeBtnClass}" data-post-id="${post.id}">
                        <i class="${likeIcon}"></i>
                    </button>
                    <button class="icon-btn" data-post-id="${post.id}">
                        <i class="far fa-comment"></i>
                    </button>
                    <button class="icon-btn" data-post-id="${post.id}">
                        <i class="far fa-paper-plane"></i>
                    </button>
                </div>
                <button class="icon-btn ${saveBtnClass}" data-post-id="${post.id}">
                    <i class="${saveIcon}"></i>
                </button>
            </div>
            <div class="post-likes">
                <strong>${post.hideLikes ? 'Beberapa orang' : post.likes}</strong> suka
            </div>
            <div class="post-caption">
                <span class="username">${postUser.username}</span> ${post.caption}
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            </div>
            <div class="post-time">
                ${formatPostTime(post.createdAt)}
            </div>
        `;
        
        // Event listeners untuk interaksi
        const likeBtn = postCard.querySelector('.like-btn');
        const saveBtn = postCard.querySelector('.save-btn');
        const commentBtn = postCard.querySelectorAll('.icon-btn')[2];
        const postImage = postCard.querySelector('.post-image');
        
        likeBtn.addEventListener('click', () => togglePostLike(post.id));
        saveBtn.addEventListener('click', () => togglePostSave(post.id));
        commentBtn.addEventListener('click', () => showPostModal(post.id));
        postImage.addEventListener('click', () => showPostModal(post.id));
        
        return postCard;
    }
    
    // Toggle like pada postingan
    function togglePostLike(postId) {
        const post = posts.find(p => p.id === postId);
        if (!post) return;
        
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        
        saveToLocalStorage();
        renderFeed();
        
        if (selectedPostId === postId) {
            updateModalPost(post);
        }
    }
    
    // Toggle save pada postingan
    function togglePostSave(postId) {
        const post = posts.find(p => p.id === postId);
        if (!post) return;
        
        post.isSaved = !post.isSaved;
        
        saveToLocalStorage();
        renderFeed();
        renderSavedPosts();
        
        if (selectedPostId === postId) {
            updateModalPost(post);
        }
        
        // Tampilkan toast notifikasi
        showToast(post.isSaved ? 'Postingan disimpan' : 'Postingan tidak disimpan lagi');
    }
    
    // Tampilkan modal postingan
    function showPostModal(postId) {
        const post = posts.find(p => p.id === postId);
        if (!post) return;
        
        selectedPostId = postId;
        
        // Cari user yang memposting
        const postUser = post.userId === userData.id ? userData : 
            suggestions.find(u => u.id === post.userId) || 
            stories.find(u => u.id === post.userId);
        
        // Update modal dengan data postingan
        modalPostImage.src = post.imageUrl;
        modalUsername.textContent = postUser.username;
        modalUserLocation.textContent = post.location || '';
        modalUserAvatar.src = postUser.avatar;
        modalPostCaption.textContent = post.caption;
        modalPostTime.textContent = formatPostTime(post.createdAt);
        
        // Update tag
        modalPostTags.innerHTML = '';
        post.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = `#${tag}`;
            modalPostTags.appendChild(tagElement);
        });
        
        // Update like dan save
        modalLikeBtn.innerHTML = post.isLiked ? 
            '<i class="fas fa-heart"></i>' : 
            '<i class="far fa-heart"></i>';
        modalLikeBtn.className = post.isLiked ? 'icon-btn like-btn active' : 'icon-btn like-btn';
        
        modalSaveBtn.innerHTML = post.isSaved ? 
            '<i class="fas fa-bookmark"></i>' : 
            '<i class="far fa-bookmark"></i>';
        modalSaveBtn.className = post.isSaved ? 'icon-btn save-btn active' : 'icon-btn save-btn';
        
        modalLikeCount.textContent = post.hideLikes ? 'Beberapa orang' : post.likes;
        
        // Render komentar
        renderComments(post.comments);
        
        // Tampilkan modal
        postModal.style.display = 'flex';
    }
    
    // Update modal postingan
    function updateModalPost(post) {
        modalLikeBtn.innerHTML = post.isLiked ? 
            '<i class="fas fa-heart"></i>' : 
            '<i class="far fa-heart"></i>';
        modalLikeBtn.className = post.isLiked ? 'icon-btn like-btn active' : 'icon-btn like-btn';
        
        modalSaveBtn.innerHTML = post.isSaved ? 
            '<i class="fas fa-bookmark"></i>' : 
            '<i class="far fa-bookmark"></i>';
        modalSaveBtn.className = post.isSaved ? 'icon-btn save-btn active' : 'icon-btn save-btn';
        
        modalLikeCount.textContent = post.hideLikes ? 'Beberapa orang' : post.likes;
    }
    
    // Render komentar
    function renderComments(comments) {
        modalCommentsList.innerHTML = '';
        
        if (comments.length === 0) {
            modalCommentsList.innerHTML = '<p class="no-comments">Belum ada komentar. Jadilah yang pertama berkomentar!</p>';
            return;
        }
        
        comments.forEach(comment => {
            const commentUser = stories.find(u => u.id === comment.userId) || 
                suggestions.find(u => u.id === comment.userId) ||
                {username: "user", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"};
            
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            
            commentItem.innerHTML = `
                <img src="${commentUser.avatar}" alt="${commentUser.username}">
                <div class="comment-content">
                    <h5>${commentUser.username}</h5>
                    <p>${comment.text}</p>
                    <div class="comment-time">${comment.time}</div>
                </div>
            `;
            
            modalCommentsList.appendChild(commentItem);
        });
    }
    
    // Toggle like pada modal
    function toggleLike() {
        const post = posts.find(p => p.id === selectedPostId);
        if (!post) return;
        
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        
        saveToLocalStorage();
        updateModalPost(post);
        renderFeed();
    }
    
    // Toggle save pada modal
    function toggleSave() {
        const post = posts.find(p => p.id === selectedPostId);
        if (!post) return;
        
        post.isSaved = !post.isSaved;
        
        saveToLocalStorage();
        updateModalPost(post);
        renderFeed();
        renderSavedPosts();
        
        showToast(post.isSaved ? 'Postingan disimpan' : 'Postingan tidak disimpan lagi');
    }
    
    // Tambah komentar
    function addComment() {
        const commentText = commentInput.value.trim();
        if (!commentText || !selectedPostId) return;
        
        const post = posts.find(p => p.id === selectedPostId);
        if (!post || !post.allowComments) return;
        
        // Buat komentar baru
        const newComment = {
            id: post.comments.length + 1,
            userId: userData.id,
            username: userData.username,
            text: commentText,
            time: 'Baru saja'
        };
        
        post.comments.unshift(newComment);
        
        // Update tampilan
        renderComments(post.comments);
        commentInput.value = '';
        
        // Simpan perubahan
        saveToLocalStorage();
        renderFeed();
        
        // Tampilkan toast
        showToast('Komentar ditambahkan');
    }
    
    // Render data profil
    function renderProfileData() {
        renderProfilePosts();
        renderProfileAlbums();
        renderSavedPosts();
        updateUserStats();
    }
    
    // Switch tab profil
    function switchProfileTab(tabId) {
        // Update tab aktif
        profileTabs.forEach(tab => {
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Update konten aktif
        tabContents.forEach(content => {
            if (content.id === `${tabId}Tab`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
    
    // Upload Functions
    function handleDragOver(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    }
    
    function handleDragLeave(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files);
        handleUploadFiles(files);
    }
    
    function handleFileSelect(e) {
        const files = Array.from(e.target.files);
        handleUploadFiles(files);
    }
    
    function handleUploadFiles(files) {
        // Filter hanya file gambar
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length === 0) {
            showToast('Tidak ada file gambar yang valid');
            return;
        }
        
        // Batasi maksimal 5 file
        if (imageFiles.length > 5) {
            showToast('Maksimal 5 file yang dapat diupload sekaligus');
            imageFiles.splice(5);
        }
        
        uploadFiles = imageFiles;
        renderUploadPreview();
    }
    
    function renderUploadPreview() {
        uploadPreview.innerHTML = '';
        
        if (uploadFiles.length === 0) {
            uploadPreview.style.display = 'none';
            return;
        }
        
        uploadPreview.style.display = 'grid';
        
        uploadFiles.forEach((file, index) => {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="remove-preview" data-index="${index}">&times;</button>
                `;
                
                uploadPreview.appendChild(previewItem);
                
                // Event untuk menghapus preview
                const removeBtn = previewItem.querySelector('.remove-preview');
                removeBtn.addEventListener('click', function() {
                    const idx = parseInt(this.dataset.index);
                    uploadFiles.splice(idx, 1);
                    renderUploadPreview();
                });
                
                // Set gambar pertama untuk edit
                if (index === 0) {
                    editImage.src = e.target.result;
                }
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    function goToNextStep() {
        if (currentStep === 3) {
            publishPost();
            return;
        }
        
        // Validasi sebelum lanjut
        if (currentStep === 1 && uploadFiles.length === 0) {
            showToast('Pilih foto terlebih dahulu');
            return;
        }
        
        currentStep++;
        updateStepUI();
    }
    
    function goToPrevStep() {
        if (currentStep === 1) return;
        
        currentStep--;
        updateStepUI();
    }
    
    function updateStepUI() {
        // Update step aktif
        uploadSteps.forEach(step => step.classList.remove('active'));
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update indikator step
        stepIndicators.forEach((dot, index) => {
            if (index < currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update tombol navigasi
        prevStepBtn.disabled = currentStep === 1;
        
        if (currentStep === 3) {
            nextStepBtn.innerHTML = 'Publikasikan <i class="fas fa-paper-plane"></i>';
        } else {
            nextStepBtn.innerHTML = 'Selanjutnya <i class="fas fa-arrow-right"></i>';
        }
    }
    
    function applyFilter(filter) {
        // Update tombol filter aktif
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        updateImageFilters();
    }
    
    function updateImageFilters() {
        let filterValue = '';
        
        // Terapkan filter berdasarkan pilihan
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            switch(activeFilter.dataset.filter) {
                case 'brightness':
                    filterValue = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%)`;
                    break;
                case 'contrast':
                    filterValue = `contrast(${contrastSlider.value}%) brightness(${brightnessSlider.value}%)`;
                    break;
                case 'vintage':
                    filterValue = `sepia(0.5) brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%)`;
                    break;
                case 'blackwhite':
                    filterValue = `grayscale(100%) brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%)`;
                    break;
                default:
                    filterValue = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%)`;
            }
        }
        
        editImage.style.filter = filterValue;
    }
    
    function updateCharCount() {
        const count = postCaption.value.length;
        charCount.textContent = count;
        
        if (count > 500) {
            charCount.style.color = '#ff3040';
        } else {
            charCount.style.color = '';
        }
    }
    
    function handleTagInput(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = tagInput.value.trim().replace(',', '');
            
            if (tag && !tags.includes(tag)) {
                tags.push(tag);
                renderTags();
            }
            
            tagInput.value = '';
        }
    }
    
    function renderTags() {
        tagsDisplay.innerHTML = '';
        
        tags.forEach((tag, index) => {
            const tagItem = document.createElement('div');
            tagItem.className = 'tag-item';
            tagItem.innerHTML = `
                ${tag}
                <button class="remove-tag" data-index="${index}">&times;</button>
            `;
            
            tagsDisplay.appendChild(tagItem);
        });
        
        // Event untuk menghapus tag
        document.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.dataset.index);
                tags.splice(idx, 1);
                renderTags();
            });
        });
    }
    
    function toggleAlbumSelection() {
        if (saveToAlbum.checked) {
            albumSelectionGroup.style.display = 'flex';
        } else {
            albumSelectionGroup.style.display = 'none';
        }
    }
    
    function createNewAlbum() {
        const albumName = prompt('Masukkan nama album baru:');
        if (!albumName) return;
        
        // Buat album baru
        const newAlbum = {
            id: albums.length + 1,
            name: albumName,
            cover: uploadFiles.length > 0 ? URL.createObjectURL(uploadFiles[0]) : '',
            postCount: 0
        };
        
        albums.push(newAlbum);
        renderAlbumOptions();
        postAlbum.value = newAlbum.id;
        
        showToast(`Album "${albumName}" berhasil dibuat`);
    }
    
    function publishPost() {
        // Validasi
        if (uploadFiles.length === 0) {
            showToast('Pilih foto terlebih dahulu');
            goToStep(1);
            return;
        }
        
        // Untuk demo, gunakan file pertama saja
        const file = uploadFiles[0];
        const imageUrl = URL.createObjectURL(file);
        
        // Buat ID baru untuk postingan
        const newPostId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
        
        // Tentukan album ID
        let albumId = null;
        if (saveToAlbum.checked && postAlbum.value) {
            albumId = parseInt(postAlbum.value);
            
            // Update album
            const album = albums.find(a => a.id === albumId);
            if (album) {
                album.postCount++;
                if (!album.cover) {
                    album.cover = imageUrl;
                }
            }
        }
        
        // Buat postingan baru
        const newPost = {
            id: newPostId,
            userId: userData.id,
            imageUrl: imageUrl,
            caption: postCaption.value,
            location: postLocation.value,
            tags: tags,
            likes: 0,
            comments: [],
            isLiked: false,
            isSaved: false,
            allowComments: allowComments.checked,
            hideLikes: hideLikes.checked,
            albumId: albumId,
            createdAt: new Date().toISOString()
        };
        
        // Tambahkan ke array postingan
        posts.unshift(newPost);
        
        // Simpan ke localStorage
        saveToLocalStorage();
        
        // Update tampilan
        renderFeed();
        renderExplore();
        renderProfilePosts();
        renderProfileAlbums();
        renderTrendingTags();
        updateUserStats();
        
        // Reset form dan kembali ke halaman beranda
        resetUploadForm();
        switchPage('home');
        
        // Tampilkan notifikasi
        showToast('Postingan berhasil dipublikasikan!');
    }
    
    function resetUploadForm() {
        // Reset state
        currentStep = 1;
        uploadFiles = [];
        tags = [];
        
        // Reset UI
        uploadPreview.innerHTML = '';
        uploadPreview.style.display = 'none';
        editImage.src = '';
        postCaption.value = '';
        charCount.textContent = '0';
        postLocation.value = '';
        tagInput.value = '';
        tagsDisplay.innerHTML = '';
        allowComments.checked = true;
        hideLikes.checked = false;
        saveToAlbum.checked = true;
        postAlbum.value = '';
        brightnessSlider.value = 100;
        contrastSlider.value = 100;
        
        // Reset filter
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === 'none') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        updateStepUI();
        toggleAlbumSelection();
    }
    
    function goToStep(step) {
        currentStep = step;
        updateStepUI();
    }
    
    // Pencarian
    function handleSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (!query) {
            renderExplore();
            return;
        }
        
        // Filter postingan berdasarkan query
        const filteredPosts = posts.filter(post => 
            post.caption.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query.replace('#', ''))) ||
            (post.location && post.location.toLowerCase().includes(query))
        );
        
        // Update grid jelajahi
        exploreGrid.innerHTML = '';
        
        filteredPosts.forEach(post => {
            const exploreItem = document.createElement('div');
            exploreItem.className = 'explore-item';
            
            exploreItem.innerHTML = `
                <img src="${post.imageUrl}" alt="Explore">
                <div class="explore-overlay">
                    <div class="post-stats">
                        <span><i class="fas fa-heart"></i> ${post.likes}</span>
                        <span><i class="fas fa-comment"></i> ${post.comments.length}</span>
                    </div>
                </div>
            `;
            
            exploreItem.addEventListener('click', () => {
                showPostModal(post.id);
            });
            
            exploreGrid.appendChild(exploreItem);
        });
    }
    
    // Helper Functions
    function formatPostTime(dateString) {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffMs = now - postDate;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Baru saja';
        if (diffMins < 60) return `${diffMins} menit yang lalu`;
        if (diffHours < 24) return `${diffHours} jam yang lalu`;
        if (diffDays < 7) return `${diffDays} hari yang lalu`;
        
        return postDate.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Hapus toast setelah 3 detik
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    function saveToLocalStorage() {
        localStorage.setItem('instagramUserData', JSON.stringify(userData));
        localStorage.setItem('instagramPosts', JSON.stringify(posts));
        localStorage.setItem('instagramAlbums', JSON.stringify(albums));
        localStorage.setItem('instagramStories', JSON.stringify(stories));
        localStorage.setItem('instagramSuggestions', JSON.stringify(suggestions));
    }
});