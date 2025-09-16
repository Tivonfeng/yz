<template>
  <div class="page5 landscape-forced">
    <!-- 主要logo区域 -->
    <div class="main-logos">
      <div class="logo-item main-logo-1">
        <img src="@/assets/yz/01/logos/1.png" alt="主logo1" class="logo-image main" />
      </div>
      <div class="logo-item main-logo-2">
        <img src="@/assets/yz/05/仪征.png" alt="仪征市" class="logo-image yizheng-logo" />
      </div>
    </div>

    <!-- 下方logo区域 -->
    <div class="bottom-logos">
      <div class="logo-item bottom-logo">
        <img src="@/assets/yz/05/来安.png" alt="来安县" class="logo-image" />
      </div>
      <div class="logo-item bottom-logo">
        <img src="@/assets/yz/05/六合.png" alt="六合区" class="logo-image" />
      </div>
      <div class="logo-item bottom-logo">
        <img src="@/assets/yz/05/金湖.png" alt="金湖县" class="logo-image" />
      </div>
      <div class="logo-item bottom-logo">
        <img src="@/assets/yz/05/定远.png" alt="定远县" class="logo-image" />
      </div>
      <div class="logo-item bottom-logo">
        <img src="@/assets/yz/05/盱眙.png" alt="盱眙县" class="logo-image" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.page5 {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: url('@/assets/yz/05/bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3% 5%;
}

/* 主要logo区域 */
.main-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-bottom: 60px;
  z-index: 10;
}

.main-logo-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-logo-2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 下方logo区域 */
.bottom-logos {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 35px;
  flex-wrap: wrap;
  z-index: 10;
  max-width: 90%;
}

.bottom-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* logo样式 */
.logo-item {
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}

.logo-item:hover {
  transform: translateY(-3px) scale(1.03);
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2));
}

.logo-image {
  height: 70px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
}

.logo-image.main {
  height: 85px;
}


/* logo文字 */
.logo-text {
  font-size: 12px;
  color: #444;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.main-text {
  text-align: left;
  white-space: normal !important;
}

.main-city {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.main-media {
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  letter-spacing: 0.3px;
}

.bottom-text {
  text-align: left;
  white-space: normal !important;
}

.city-name {
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-bottom: 2px;
}

.media-center {
  font-size: 11px;
  font-weight: 500;
  color: #666;
}

.logo-item:hover .logo-text {
  transform: translateY(-2px);
}

.logo-item:hover .city-name {
  color: #e74c3c;
}

.logo-item:hover .media-center {
  color: #e74c3c;
}

.logo-item:hover .main-city {
  color: #e74c3c;
}

.logo-item:hover .main-media {
  color: #e74c3c;
}


/* 响应式调整 */
@media (max-width: 1200px) {
  .main-logos {
    gap: 30px;
    margin-bottom: 50px;
  }
  
  .bottom-logos {
    gap: 25px;
  }
  
  .logo-image {
    height: 60px;
  }
  
  .logo-image.main {
    height: 80px;
  }
  
  
  .main-city {
    font-size: 15px;
  }
  
  .main-media {
    font-size: 13px;
  }
  
  .city-name {
    font-size: 12px;
  }
  
  .media-center {
    font-size: 10px;
  }
}

@media (max-width: 900px) {
  .page5 {
    padding: 2% 3%;
  }
  
  .main-logos {
    gap: 25px;
    margin-bottom: 40px;
  }
  
  .bottom-logos {
    gap: 20px;
  }
  
  .logo-image {
    height: 55px;
  }
  
  .logo-image.main {
    height: 75px;
  }
  
  
  .main-city {
    font-size: 14px;
  }
  
  .main-media {
    font-size: 12px;
  }
}

@media (max-width: 700px) {
  .main-logos {
    flex-direction: row;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .main-logo-2 {
    flex-direction: row;
    gap: 15px;
  }
  
  .bottom-logos {
    gap: 15px;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .bottom-logo {
    min-width: 80px;
  }
  
  .logo-image {
    height: 50px;
  }
  
  .logo-image.main {
    height: 70px;
  }
  
  .yizheng-logo {
    height: 70px !important;
  }
  
  .city-name {
    font-size: 11px;
  }
  
  .media-center {
    font-size: 9px;
  }
}

@media (max-width: 500px) {
  .main-logos {
    flex-direction: row;
    gap: 15px;
    margin-bottom: 25px;
  }
  
  .main-logo-2 {
    flex-direction: row;
    gap: 10px;
  }
  
  .logo-image.main {
    height: 45px;
  }
  
  .yizheng-logo {
    height: 60px !important;
  }
  
  .main-city {
    font-size: 12px;
  }
  
  .main-media {
    font-size: 10px;
  }
  
  .bottom-logos {
    gap: 12px;
  }
  
  .logo-image {
    height: 45px;
  }
  
  .yizheng-logo {
    height: 75px !important;
  }
  
  .city-name {
    font-size: 10px;
  }
  
  .media-center {
    font-size: 8px;
  }
}
</style>