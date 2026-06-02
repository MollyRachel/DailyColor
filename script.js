const COLOR_NAMES = [
  { hex: '#FF6B6B', name: '珊瑚红', englishName: 'Coral Red' },
  { hex: '#4ECDC4', name: '薄荷绿', englishName: 'Mint Green' },
  { hex: '#45B7D1', name: '天空蓝', englishName: 'Sky Blue' },
  { hex: '#96CEB4', name: '苔绿', englishName: 'Moss Green' },
  { hex: '#FFEAA7', name: '柠檬黄', englishName: 'Lemon Yellow' },
  { hex: '#DDA0DD', name: '梅红', englishName: 'Plum Red' },
  { hex: '#98D8C8', name: '青绿', englishName: 'Turquoise' },
  { hex: '#F7DC6F', name: '金黄', englishName: 'Golden Yellow' },
  { hex: '#BB8FCE', name: '紫罗兰', englishName: 'Violet' },
  { hex: '#85C1E9', name: '浅蓝', englishName: 'Light Blue' },
  { hex: '#F8B500', name: '琥珀', englishName: 'Amber' },
  { hex: '#FF69B4', name: '粉红', englishName: 'Hot Pink' },
  { hex: '#00CED1', name: '青色', englishName: 'Cyan' },
  { hex: '#FFD700', name: '金色', englishName: 'Gold' },
  { hex: '#FF7F50', name: '珊瑚橙', englishName: 'Coral Orange' },
  { hex: '#20B2AA', name: '浅海绿', englishName: 'Light Sea Green' },
  { hex: '#BA55D3', name: '紫水晶', englishName: 'Amethyst' },
  { hex: '#FFB6C1', name: '浅粉', englishName: 'Light Pink' },
  { hex: '#00FA9A', name: '春绿', englishName: 'Spring Green' },
  { hex: '#FFDAB9', name: '桃色', englishName: 'Peach' },
  { hex: '#9370DB', name: '梅紫', englishName: 'Plum Purple' },
  { hex: '#87CEEB', name: '天蓝', englishName: 'Sky Blue' },
  { hex: '#F0E68C', name: '小麦色', englishName: 'Wheat' },
  { hex: '#CD853F', name: '秘鲁棕', englishName: 'Peru' },
  { hex: '#FFE4E1', name: '雪粉', englishName: 'Snow Pink' },
  { hex: '#E6E6FA', name: '薰衣草', englishName: 'Lavender' },
  { hex: '#AFEEEE', name: '苍白绿', englishName: 'Pale Turquoise' },
  { hex: '#FFFACD', name: '柠檬奶油', englishName: 'Lemon Cream' },
  { hex: '#DDA0DD', name: '梅红', englishName: 'Plum Red' },
  { hex: '#F0FFF0', name: '蜂蜜', englishName: 'Honeydew' },
  { hex: '#FFEFD5', name: '番木瓜', englishName: 'Papaya Whip' },
  { hex: '#FFD39B', name: '杏色', englishName: 'Apricot' },
];

let currentTheme = 'garden';
let currentGroup = 'default';
let todayColor = null;
let selectedGroupTheme = 'garden';
let currentUser = loadData('currentUser', { id: 'user_' + Date.now(), name: '我' });

function getTodayColor() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % COLOR_NAMES.length;
  return COLOR_NAMES[index];
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekday = weekdays[date.getDay()];
  return `${year}年${month}月${day}日 ${weekday}`;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key, defaultValue = null) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
}

function initTheme() {
  const savedTheme = loadData('colorTheme', 'garden');
  setTheme(savedTheme);
  
  document.getElementById('gardenTheme').addEventListener('click', () => setTheme('garden'));
  document.getElementById('galaxyTheme').addEventListener('click', () => setTheme('galaxy'));
}

function setTheme(theme) {
  currentTheme = theme;
  document.body.className = theme;
  
  document.getElementById('gardenTheme').classList.toggle('active', theme === 'garden');
  document.getElementById('galaxyTheme').classList.toggle('active', theme === 'galaxy');
  
  saveData('colorTheme', theme);
  updateDecorations();
}

function updateDecorations() {
  document.querySelectorAll('.star, .flower, .shooting-star').forEach(el => el.remove());
  
  if (currentTheme === 'galaxy') {
    for (let i = 0; i < 80; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (Math.random() * 2 + 1) + 's';
      const size = Math.random() * 3 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.background = size > 2 ? '#ffffff' : 'rgba(255,255,255,0.8)';
      document.body.appendChild(star);
    }
    
    for (let i = 0; i < 4; i++) {
      const shooting = document.createElement('div');
      shooting.className = 'shooting-star';
      const fromLeft = i % 2 === 0;
      shooting.style.left = fromLeft ? Math.random() * 15 + '%' : Math.random() * 15 + 85 + '%';
      shooting.style.top = Math.random() * 50 + '%';
      shooting.style.animationDelay = (i * 4 + Math.random() * 2) + 's';
      document.body.appendChild(shooting);
    }
  } else {
    const flowers = ['🌸', '🌺', '🌻', '🌼', '🌷', '💐', '🌿', '🍀'];
    const positions = [
      { left: 0, right: 18, top: 20, bottom: 40 },
      { left: 82, right: 100, top: 20, bottom: 40 },
      { left: 0, right: 18, top: 50, bottom: 70 },
      { left: 82, right: 100, top: 50, bottom: 70 },
      { left: 0, right: 18, top: 75, bottom: 95 },
      { left: 82, right: 100, top: 75, bottom: 95 },
      { left: 25, right: 45, top: 5, bottom: 15 },
      { left: 55, right: 75, top: 5, bottom: 15 },
      { left: 35, right: 65, top: 90, bottom: 98 },
    ];
    
    for (let i = 0; i < positions.length; i++) {
      const flower = document.createElement('div');
      flower.className = 'flower';
      flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
      
      const pos = positions[i];
      flower.style.left = Math.random() * (pos.right - pos.left) + pos.left + '%';
      flower.style.top = Math.random() * (pos.bottom - pos.top) + pos.top + '%';
      
      flower.style.animationDelay = Math.random() * 4 + 's';
      flower.style.animationDuration = (Math.random() * 2 + 3) + 's';
      flower.style.fontSize = (Math.random() * 14 + 12) + 'px';
      flower.style.opacity = 0.35;
      document.body.appendChild(flower);
    }
  }
}

function initTodayColor() {
  todayColor = getTodayColor();
  
  const colorDisplay = document.getElementById('colorDisplay');
  const colorName = document.getElementById('colorName');
  const colorHex = document.getElementById('colorHex');
  const colorDot = document.getElementById('colorDot');
  
  colorDisplay.style.background = `radial-gradient(circle at 30% 30%, ${todayColor.hex}, ${adjustColor(todayColor.hex, -40)})`;
  colorDot.style.background = todayColor.hex;
  colorName.textContent = todayColor.name;
  colorHex.textContent = todayColor.englishName;
  
  document.documentElement.style.setProperty('--theme-primary', todayColor.hex);
  document.documentElement.style.setProperty('--theme-secondary', adjustColor(todayColor.hex, 30));
}

function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

function initUpload() {
  const photoInput = document.getElementById('photoInput');
  const uploadArea = document.getElementById('uploadArea');
  
  photoInput.addEventListener('change', handlePhotoUpload);
  
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = todayColor.hex;
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '';
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  });
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
}

function handleFile(file) {
  if (!file.type.startsWith('image/')) {
    showToast('请选择图片文件');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    savePhoto(e.target.result);
  };
  reader.readAsDataURL(file);
}

function savePhoto(base64) {
  const today = new Date().toISOString().split('T')[0];
  const photos = loadData('photos', {});
  
  if (!photos[currentGroup]) {
    photos[currentGroup] = [];
  }
  
  const photo = {
    id: Date.now(),
    date: today,
    color: todayColor.hex,
    colorName: todayColor.name,
    data: base64,
    group: currentGroup
  };
  
  photos[currentGroup].unshift(photo);
  saveData('photos', photos);
  
  showToast('打卡成功！');
  updateStats();
  updateWeekTrail();
  updateGallery();
}

function updateStats() {
  const photos = loadData('photos', {});
  let totalDays = 0;
  const dates = new Set();
  
  Object.values(photos).forEach(groupPhotos => {
    groupPhotos.forEach(photo => {
      dates.add(photo.date);
    });
  });
  
  totalDays = dates.size;
  
  const today = new Date().toISOString().split('T')[0];
  let streak = 0;
  let checkDate = new Date();
  
  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (dates.has(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  document.getElementById('totalDays').textContent = totalDays;
  document.getElementById('currentStreak').textContent = streak;
  
  const groups = loadData('groups', {});
  document.getElementById('groupCount').textContent = Object.keys(groups).length + 1;
}

function updateWeekTrail() {
  const photos = loadData('photos', {});
  const weekDots = document.getElementById('weekDots');
  
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const startDate = new Date(2026, 5, 1);
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.max(1, Math.floor(daysSinceStart / 7) + 1);
  document.getElementById('weekNumber').textContent = currentWeek;
  
  let html = '';
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay();
    const isToday = i === 0;
    
    let hasPhoto = false;
    Object.values(photos).forEach(groupPhotos => {
      if (groupPhotos.some(p => p.date === dateStr)) {
        hasPhoto = true;
      }
    });
    
    const dayNumber = date.getDate();
    const classes = ['week-dot', `day-${dayOfWeek}`];
    if (hasPhoto) classes.push('filled');
    if (isToday) classes.push('today');
    
    html += `
      <div class="${classes.join(' ')}">
        ${hasPhoto ? `<span class="week-number">${dayNumber}</span>` : ''}
      </div>
    `;
  }
  
  weekDots.innerHTML = html;
}

function updateGallery() {
  const photos = loadData('photos', {});
  const galleryGrid = document.getElementById('galleryGrid');
  
  const groupPhotos = photos[currentGroup] || [];
  
  if (groupPhotos.length === 0) {
    galleryGrid.innerHTML = '<div class="no-photos">还没有打卡记录，快去上传今天的照片吧！</div>';
    return;
  }
  
  galleryGrid.innerHTML = groupPhotos.map(photo => `
    <div class="gallery-item" onclick="previewPhoto(${photo.id})">
      <img src="${photo.data}" alt="${photo.colorName}">
    </div>
  `).join('');
}

function previewPhoto(id) {
  const photos = loadData('photos', {});
  let found = null;
  
  Object.values(photos).forEach(groupPhotos => {
    const photo = groupPhotos.find(p => p.id === id);
    if (photo) found = photo;
  });
  
  if (found) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 90vw; max-height: 90vh; padding: 0;">
        <img src="${found.data}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 20px;">
        <button class="modal-btn cancel" style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%);" onclick="this.parentElement.parentElement.remove()">关闭</button>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

function initGroups() {
  const createGroupBtn = document.getElementById('createGroupBtn');
  const modal = document.getElementById('createGroupModal');
  const cancelBtn = document.getElementById('cancelGroupBtn');
  const confirmBtn = document.getElementById('confirmGroupBtn');
  const groupNameInput = document.getElementById('groupNameInput');
  
  createGroupBtn.addEventListener('click', () => {
    modal.classList.add('show');
    groupNameInput.value = '';
    selectedGroupTheme = currentTheme;
    selectGroupTheme(currentTheme);
  });
  
  cancelBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });
  
  confirmBtn.addEventListener('click', () => {
    const name = groupNameInput.value.trim();
    if (!name) {
      showToast('请输入空间名称');
      return;
    }
    
    createGroup(name);
    modal.classList.remove('show');
  });
  
  updateGroupList();
}

function selectGroupTheme(theme) {
  selectedGroupTheme = theme;
  
  document.getElementById('gardenOption').classList.toggle('active', theme === 'garden');
  document.getElementById('galaxyOption').classList.toggle('active', theme === 'galaxy');
}

function createGroup(name) {
  const groups = loadData('groups', {});
  const groupId = 'group_' + Date.now();
  
  groups[groupId] = {
    id: groupId,
    name: name,
    theme: selectedGroupTheme,
    createdAt: new Date().toISOString()
  };
  
  saveData('groups', groups);
  showToast('空间创建成功！');
  updateGroupList();
}

function generateInviteCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function updateGroupList() {
  const groups = loadData('groups', {});
  const groupList = document.getElementById('groupList');
  const photos = loadData('photos', {});
  
  let html = `
    <div class="group-item ${currentGroup === 'default' ? 'active' : ''}" onclick="selectGroup('default')">
      <div class="group-name">我的个人空间</div>
      <div class="group-count">${photos['default'] ? photos['default'].length : 0} 张</div>
    </div>
  `;
  
  Object.values(groups).forEach(group => {
    const count = photos[group.id] ? photos[group.id].length : 0;
    html += `
      <div class="group-item ${currentGroup === group.id ? 'active' : ''}">
        <div class="group-content" onclick="selectGroup('${group.id}')">
          <div class="group-name">${group.name}</div>
          <div class="group-count">${count} 张</div>
        </div>
        <div class="group-actions">
          <button class="group-action-btn" onclick="editGroupName('${group.id}')">✏️</button>
          <button class="group-action-btn" onclick="deleteGroup('${group.id}')">🗑️</button>
        </div>
      </div>
    `;
  });
  
  groupList.innerHTML = html;
}

function editGroupName(groupId) {
  const groups = loadData('groups', {});
  const group = groups[groupId];
  
  if (!group) return;
  
  const newName = prompt('请输入新的空间名称:', group.name);
  if (newName && newName.trim()) {
    group.name = newName.trim();
    saveData('groups', groups);
    updateGroupList();
    showToast('名称已修改');
  }
}

function deleteGroup(groupId) {
  const groups = loadData('groups', {});
  const group = groups[groupId];
  
  if (!group) return;
  
  if (!confirm(`确定要删除「${group.name}」空间吗？所有打卡记录也将被删除。`)) {
    return;
  }
  
  delete groups[groupId];
  saveData('groups', groups);
  
  const photos = loadData('photos', {});
  delete photos[groupId];
  saveData('photos', photos);
  
  if (currentGroup === groupId) {
    currentGroup = 'default';
  }
  
  updateGroupList();
  updateGallery();
  updateStats();
  showToast('空间已删除');
}

function createGroup(name) {
  const groups = loadData('groups', {});
  const groupId = 'group_' + Date.now();
  
  groups[groupId] = {
    id: groupId,
    name: name,
    theme: selectedGroupTheme,
    inviteCode: generateInviteCode(),
    createdAt: new Date().toISOString()
  };
  
  saveData('groups', groups);
  showToast('空间创建成功！邀请码: ' + groups[groupId].inviteCode);
  updateGroupList();
}

function joinByInviteCode() {
  const inviteCode = document.getElementById('inviteCodeInput').value.trim().toUpperCase();
  
  if (!inviteCode) {
    showToast('请输入邀请码');
    return;
  }
  
  const groups = loadData('groups', {});
  const foundGroup = Object.values(groups).find(group => group.inviteCode === inviteCode);
  
  if (foundGroup) {
    if (foundGroup.id === currentGroup) {
      showToast('您已经在这个空间里了');
      return;
    }
    
    selectGroup(foundGroup.id);
    document.getElementById('inviteCodeInput').value = '';
    showToast('成功加入「' + foundGroup.name + '」空间！');
  } else {
    showToast('邀请码无效');
  }
}

function selectGroup(groupId) {
  currentGroup = groupId;
  updateGroupList();
  updateGallery();
}

function switchTab(tab) {
  const homePage = document.getElementById('homePage');
  const communityPage = document.getElementById('communityPage');
  const homeTab = document.getElementById('homeTab');
  const communityTab = document.getElementById('communityTab');
  
  if (tab === 'home') {
    homePage.style.display = 'block';
    communityPage.style.display = 'none';
    homeTab.classList.add('active');
    communityTab.classList.remove('active');
  } else if (tab === 'community') {
    homePage.style.display = 'none';
    communityPage.style.display = 'block';
    homeTab.classList.remove('active');
    communityTab.classList.add('active');
    updateCommunityFeed();
    updateCommunityGroupList();
  }
}

function openCameraModal() {
  document.getElementById('cameraModal').classList.add('show');
}

function closeCameraModal() {
  document.getElementById('cameraModal').classList.remove('show');
}

function takePhoto(source) {
  closeCameraModal();
  
  if (source === 'camera') {
    document.getElementById('cameraInput').click();
  } else {
    document.getElementById('galleryInput').click();
  }
}

function handleCameraUpload(e) {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
}

function handleGalleryUpload(e) {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
}

function openShareModal() {
  const groups = loadData('groups', {});
  const activeGroup = Object.values(groups).find(g => g.id === currentGroup);
  
  let shareUrl = window.location.origin + window.location.pathname;
  if (currentGroup !== 'default' && activeGroup) {
    shareUrl += '?group=' + activeGroup.id + '&groupName=' + encodeURIComponent(activeGroup.name);
  }
  
  document.getElementById('shareLink').value = shareUrl;
  document.getElementById('shareModal').classList.add('show');
}

function closeShareModal() {
  document.getElementById('shareModal').classList.remove('show');
}

function copyShareLink() {
  const linkInput = document.getElementById('shareLink');
  linkInput.select();
  document.execCommand('copy');
  showToast('链接已复制！');
  closeShareModal();
}

function joinGroupViaLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const groupId = urlParams.get('group');
  const groupName = urlParams.get('groupName');
  
  if (groupId && groupId !== currentGroup) {
    const groups = loadData('groups', {});
    
    if (!groups[groupId] && groupName) {
      document.getElementById('joinGroupModalTitle').textContent = '是否加入「' + decodeURIComponent(groupName) + '」空间？';
      document.getElementById('joinGroupModal').classList.add('show');
      
      window.pendingGroupId = groupId;
      window.pendingGroupName = groupName;
    } else if (groups[groupId]) {
      selectGroup(groupId);
      showToast('已加入该空间！');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
}

function acceptJoinGroup() {
  if (window.pendingGroupId && window.pendingGroupName) {
    const groups = loadData('groups', {});
    groups[window.pendingGroupId] = {
      id: window.pendingGroupId,
      name: decodeURIComponent(window.pendingGroupName),
      theme: 'garden',
      createdAt: new Date().toISOString()
    };
    saveData('groups', groups);
    
    selectGroup(window.pendingGroupId);
    document.getElementById('joinGroupModal').classList.remove('show');
    showToast('成功加入空间！');
    window.history.replaceState({}, document.title, window.location.pathname);
    
    window.pendingGroupId = null;
    window.pendingGroupName = null;
  }
}

function rejectJoinGroup() {
  document.getElementById('joinGroupModal').classList.remove('show');
  window.pendingGroupId = null;
  window.pendingGroupName = null;
  window.history.replaceState({}, document.title, window.location.pathname);
}

function updateCommunityGroupList() {
  const groups = loadData('groups', {});
  const communityGroupList = document.getElementById('communityGroupList');
  const photos = loadData('photos', {});
  
  let totalCount = 0;
  Object.values(photos).forEach(groupPhotos => {
    totalCount += groupPhotos.length;
  });
  
  let html = `
    <div class="group-item ${currentGroup === 'all' ? 'active' : ''}" onclick="selectCommunityGroup('all')">
      <div class="group-name">全部动态</div>
      <div class="group-count">${totalCount}</div>
    </div>
    <div class="group-item ${currentGroup === 'default' ? 'active' : ''}" onclick="selectCommunityGroup('default')">
      <div class="group-name">我的个人空间</div>
      <div class="group-count">${photos['default'] ? photos['default'].length : 0}</div>
    </div>
  `;
  
  Object.values(groups).forEach(group => {
    const count = photos[group.id] ? photos[group.id].length : 0;
    html += `
      <div class="group-item ${currentGroup === group.id ? 'active' : ''}" onclick="selectCommunityGroup('${group.id}')">
        <div class="group-name">${group.name}</div>
        <div class="group-count">${count}</div>
      </div>
    `;
  });
  
  communityGroupList.innerHTML = html;
}

function selectCommunityGroup(groupId) {
  currentGroup = groupId;
  updateCommunityGroupList();
  updateCommunityFeed();
}

function updateCommunityFeed() {
  const photos = loadData('photos', {});
  const communityFeed = document.getElementById('communityFeed');
  
  let allPhotos = [];
  
  if (currentGroup === 'all') {
    Object.values(photos).forEach(groupPhotos => {
      allPhotos = allPhotos.concat(groupPhotos);
    });
  } else {
    allPhotos = photos[currentGroup] || [];
  }
  
  allPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  if (allPhotos.length === 0) {
    communityFeed.innerHTML = '<div class="no-photos">还没有动态，邀请好友一起打卡吧！</div>';
    return;
  }
  
  const userAvatars = {
    'user_1': '👩',
    'user_2': '👨',
    'user_3': '👧',
    'user_4': '👴',
    'user_5': '👵',
    'default': '🧑'
  };
  
  const userNames = {
    'user_1': '小花',
    'user_2': '小明',
    'user_3': '小红',
    'user_4': '老李',
    'user_5': '张阿姨',
    'default': '我'
  };
  
  let html = '';
  allPhotos.forEach(photo => {
    const userId = photo.userId || 'default';
    const avatar = userAvatars[userId] || '🧑';
    const userName = userNames[userId] || '用户';
    
    const date = new Date(photo.date);
    const dateStr = `${date.getMonth() + 1}月${date.getDate()}日`;
    
    html += `
      <div class="feed-item">
        <div class="feed-header">
          <div class="feed-avatar">${avatar}</div>
          <div class="feed-user-info">
            <div class="feed-username">${userName}</div>
            <div class="feed-date">${dateStr}</div>
          </div>
        </div>
        <img src="${photo.data}" class="feed-image" alt="${photo.colorName}">
        <div class="feed-color-tag" style="background: ${photo.color}">${photo.colorName}</div>
      </div>
    `;
  });
  
  communityFeed.innerHTML = html;
}

function init() {
  initTheme();
  initTodayColor();
  initUpload();
  initGroups();
  updateStats();
  updateWeekTrail();
  updateGallery();
  
  const cameraInput = document.getElementById('cameraInput');
  const galleryInput = document.getElementById('galleryInput');
  const inviteBtn = document.getElementById('inviteBtn');
  
  if (cameraInput) {
    cameraInput.addEventListener('change', handleCameraUpload);
  }
  
  if (galleryInput) {
    galleryInput.addEventListener('change', handleGalleryUpload);
  }
  
  if (inviteBtn) {
    inviteBtn.addEventListener('click', openShareModal);
  }
  
  const groups = loadData('groups', {});
  const photos = loadData('photos', {});
  
  if (!photos['default']) {
    photos['default'] = [];
    saveData('photos', photos);
  }
  
  saveData('currentUser', currentUser);
  joinGroupViaLink();
}

document.addEventListener('DOMContentLoaded', init);
