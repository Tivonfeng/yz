<template>
  <div class="page3 landscape-forced">
    <!-- 角标装饰 -->
    <div class="corner-decoration" v-motion="cornerMotion">
      <img 
        src="@/assets/yz/03/角标.png" 
        alt="角标装饰" 
        class="corner-image"
      />
    </div>


    <!-- 位置线背景 -->
    <div class="position-line" v-motion="lineMotion">
      <img src="@/assets/yz/03/位置线.png" alt="位置线" class="line-image" />
    </div>

    <!-- 城市展示区域 -->
    <div class="cities-container" v-motion="citiesMotion">
      <!-- 仪征 - 左上角 -->
      <div class="city-item city-yizheng" v-motion="getCityMotion(0)" @click="openCityModal('yizheng')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/仪征.png" alt="仪征" class="landmark-image" />
        </div>
        <div class="city-name">仪征</div>
        <div class="position-point" v-motion="getPointMotion(0)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 来安 - 上方中左 -->
      <div class="city-item city-laian" v-motion="getCityMotion(1)" @click="openCityModal('laian')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/来安.png" alt="来安" class="landmark-image" />
        </div>
        <div class="city-name">来安</div>
        <div class="position-point" v-motion="getPointMotion(1)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 六合 - 上方中右 -->
      <div class="city-item city-liuhe" v-motion="getCityMotion(2)" @click="openCityModal('liuhe')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/六合.png" alt="六合" class="landmark-image" />
        </div>
        <div class="city-name">六合</div>
        <div class="position-point" v-motion="getPointMotion(2)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>

      <!-- 金湖 - 中下位置 -->
      <div class="city-item city-jinhu" v-motion="getCityMotion(3)" @click="openCityModal('jinhu')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/金湖.png" alt="金湖" class="landmark-image" />
        </div>
        <div class="city-name">金湖</div>
        <div class="position-point" v-motion="getPointMotion(3)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 定远 - 右上角 -->
      <div class="city-item city-dingyuan" v-motion="getCityMotion(4)" @click="openCityModal('dingyuan')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/定远.png" alt="定远" class="landmark-image" />
        </div>
        <div class="city-name">定远</div>
        <div class="position-point" v-motion="getPointMotion(4)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 盱眙 - 右下角 -->
      <div class="city-item city-xuyi" v-motion="getCityMotion(5)" @click="openCityModal('xuyi')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/盱眙.png" alt="盱眙" class="landmark-image" />
        </div>
        <div class="city-name">盱眙</div>
        <div class="position-point" v-motion="getPointMotion(5)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
    </div>

    <!-- 全屏透明模糊遮罩 -->
    <Transition
      enter-active-class="modal-enter-active"
      leave-active-class="modal-leave-active"
      enter-from-class="modal-enter-from"
      leave-to-class="modal-leave-to"
    >
      <div v-if="isModalVisible" class="city-modal-overlay" @click="closeCityModal">
        <img 
          src="@/assets/yz/03/角标.png" 
          alt="角标装饰" 
          class="overlay-image"
        />
        <!-- 彩带装饰 -->
        <img src="@/assets/yz/04/彩带1.png" class="absolute bottom-[4%] left-[8%] w-30 h-30 opacity-80 pointer-events-none z-20 animate-ribbon">
		<CityModal v-if="selectedCityData" :cityData="selectedCityData" @close="closeCityModal"></CityModal>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CityModal from '@/components/CityModal.vue'
// 角标动画
const cornerMotion = computed(() => ({
  initial: { opacity: 0, scale: 0.5, rotate: -45 },
  enter: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { 
      delay: 300,
      duration: 1000,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
}))


// 位置线动画
const lineMotion = computed(() => ({
  initial: { opacity: 0, scale: 0.5 },
  enter: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: 700,
      duration: 1500,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}))

// 城市容器动画
const citiesMotion = computed(() => ({
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { 
      delay: 1000,
      duration: 500,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}))

// 位置点动画
const getPointMotion = (index: number) => ({
  initial: { opacity: 0, scale: 0 },
  enter: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: 1100 + index * 100, 
      duration: 400, 
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
})

// 单个城市动画
const getCityMotion = (index: number) => ({
  initial: { opacity: 0, y: 50, scale: 0.8 },
  enter: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      delay: 1300 + index * 150, 
      duration: 600, 
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
})

// 弹窗相关状态
const isModalVisible = ref(false)
const selectedCityData = ref<typeof citiesData[keyof typeof citiesData] | null>(null)





// 城市数据
const citiesData = {
  yizheng: {
    name: '仪征',
    historyItems: [
      {
        description: '1939年11月，新四军苏皖支队抵达仪征，在陈集镇沙集村成立中共仪征县委。1940年4月，仪征县抗日民主政府在月塘曹集成立，建立5个区、1个办事处和50多个乡政权。在津浦路东省委领导下，广泛动员群众，组织农抗会、青年队、民兵等地方武装，扩大和巩固抗日根据地，成为抗战的坚强堡垒。',
        title: '仪征政权立​',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '1939年12月18日，日伪军800余人分三路合击月塘集。苏皖支队避其锋芒，主力转移至移居集隐蔽。傍晚利用地形和群众支援，反击压缩敌人至北大庙，激战三小时收复月塘。此战歼敌90余人，缴获枪械40余支，极大鼓舞军民斗志，成为新四军在仪征的里程碑之战。',
        title: '月塘反击战',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '1941年春，日军推行“囚笼政策”，修筑公路工事，企图分割根据地。新四军二师多路出击，攻克谢集、刘集等据点，伏击援敌。4月16-17日，运用“梅花桩战术”在金牛山重创日伪军，歼敌500余人，缴获机枪、掷弹筒等武器，粉碎大规模扫荡，极大地增强了军民坚持敌后抗日斗争的信心。',
        title: '金牛山战斗​',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '月塘位于淮南根据地中心，成为华中局与苏南、上海地下党交通枢纽，三条秘密线路贯通南北，以茶食商行等为掩护，护送近千名干部、进步青年和领导人安全往来，转运重要文件和军需物资，从未发生问题，成为抗战时期重要生命线。',
        title: '秘密交通线​',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '1939年，曹兰田、陆毅等组建曹集民兵，从农抗会发展为地方武装，配合主力作战，破坏交通桥梁，掩护群众转移。两年内参加战斗50余次，歼敌100余人，逮捕叛徒特务20多人。1942年，陆毅获淮南路东英模大会嘉奖，曹集民兵被誉为“名闻淮南路东的民兵英雄集体”，其爱国精神永载史册。',
        title: '民兵英雄誉​',
        src: '/videos/yizheng-battle.mp4',
      },
    ]
  },
  laian: {
    name: '来安',
	historyItems: [
      {
        description: '罗炳辉将军率新四军三打来安城，首创"梅花桩战术"等经典战法，以少胜多巩固皖东抗日根据地，彰显我军卓越军事智慧与抗战精神。',
        title: '三打来安城​',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '半塔保卫战是新四军以少胜多、固守待援的经典战例。1940年春，新四军2000余官兵顽强抵抗国民党万余兵力进攻，最终配合东援主力取得胜利，为华中抗日根据地巩固发展奠定重要基础。',
        title: '半塔保卫战​',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '皖东女英雄侯静波，19岁壮烈牺牲。她宣传抗日、发动群众，被叛徒出卖后坚贞不屈，英勇就义。其精神永存，家乡静波村以她命名。',
        title: '英雄侯静波​',
        src: '/videos/yizheng-battle.mp4',
      },
    ]
  },
  liuhe: {
    name: '六合',
	historyItems: [
      {
        description: '六合竹镇抗日民主政府纪念馆见证烽火岁月：新四军英勇作战，统一战线凝聚民心，革命精神永续传承。',
        title: '竹镇纪念馆​',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '烽火硝烟中诞生的竹镇派出所，是新四军在淮南路东设立的首个公安机构。80多年来，“三不走”精神薪火相传，如今民警以新“三不走”守护百姓，续写红色基因的时代新篇。',
        title: '精神薪火传​',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '《归队》讲述抗战英烈张凤鸣迁葬桂子山陵园，与战友团聚。守陵人与家属共同守护英雄记忆，传承牺牲精神，见证硝烟散尽、忠魂永存。',
        title: '忠魂归队颂​',
        src: '/videos/yizheng-battle.mp4',
      },
    ]
  },
  jinhu: {
    name: '金湖',
	historyItems: [
      {
        description: '80多年前，军工英雄吴运铎在金湖艰苦条件下，带领群众自制弹药，身负重伤仍坚持科研，成功研制枪榴弹助力抗战，被誉为中国“保尔·柯察金”。其精神至今激励后人。',
        title: '军工英雄颂',
        src: '/videos/yizheng-battle.mp4',
      },
    ]
  },
  dingyuan: {
    name: '定远',
	historyItems: [
      {
        description: '80 多年前，面对国民党顽固派进攻，刘少奇、徐海东等指挥新四军打响定远自卫反击战。将士们协同作战 7 天获胜，建华中首个县级抗日民主政权，为抗战胜利筑牢屏障，精神永垂。',
        title: '定远自卫战​',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '80 多年前，“虎将” 徐海东带病赴华中，任新四军江北指挥部副指挥，指挥周家岗反 “扫荡” 首胜日军。他 9 次负伤仍坚守，以忠诚勇猛书写传奇，激励后人传承革命精神。',
        title: '虎将徐海东​',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '80 多年前，定远作为抗日根据地核心，新四军二师浴血奋战。王小庙安葬 1200 余名无名烈士，如今 “寻亲队伍” 与学界为其寻名，英烈精神永被铭记。',
        title: '英烈永铭记​',
        src: '/videos/yizheng-battle.mp4',
      },
    ]
  },
  xuyi: {
    name: '盱眙',
	historyItems: [
      {
        description: '1943年1月，新四军军部移驻黄花塘两年零八个月，作为华中抗战指挥中心，粉碎敌人进攻、壮大队伍、开辟根据地，为抗战胜利贡献卓著。',
        title: '华中指挥部',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '陈毅在黄花塘工作期间，恰逢房东家娶亲，因条件艰苦，以一块红布作为结婚贺礼相赠，该红布被房东家保存近30多年后，于2003年捐赠给纪念馆，成为新四军与老百姓鱼水深情的见证。',
        title: '​红布寄深情',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '黄花塘原名黄昏塘，因景致引“战地黄花分外香”改名，军部迁此因抗战形势、有利地理及好群众基础，驻扎两年零八个月后迁淮阴再北上山东。',
        title: '黄花塘之名​',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '抗战时期，盱眙群众积极拥护新四军，1943至1944年自然灾害严重，仍为新四军送大量粮食、烧草；新四军通过制定《拥政爱民公约》、开展“双拥”活动及遵守“五不走”原则，与盱眙人民建立起鱼水深情。',
        title: '鱼水情谊深',
        src: '/videos/yizheng-battle.mp4',
      },
	  {
        description: '1943年春，新四军文艺战士刘鹏为《白菜谣》谱曲，歌曲传唱华中根据地，彰显军民鱼水情与抗敌决心；同年年底，他高烧40多度仍坚持军部慰问演出，后因牙疳缺医少药以身殉职，年仅16岁，《白菜谣》至今仍被传唱。',
        title: '​白菜谣永传​​',
        src: '/videos/yizheng-battle.mp4',
      },
    ]
  }
}

// 打开城市详情弹窗
const openCityModal = (cityKey: keyof typeof citiesData) => {
  selectedCityData.value = citiesData[cityKey]
  isModalVisible.value = true
}

// 关闭弹窗
const closeCityModal = () => {
  isModalVisible.value = false
  selectedCityData.value = null
}


</script>

<style scoped>
.page3 {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: url('@/assets/yz/03/背景.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 角标装饰 */
.corner-decoration {
  position: absolute;
  top: 3%;
  left: 3%;
  z-index: 10;
}

.corner-image {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.overlay-image{
	position: absolute;
  top: 3%;
  left: 3%;
	height: 30px;
  width: auto;
  object-fit: contain;
  filter: brightness(1.1) contrast(1.1);
}

/* 位置线 */
.position-line {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  height: 60%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.line-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  opacity: 0.9;
}

/* 城市展示区域 */
.cities-container {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 20%;
  z-index: 5;
}

.city-item {
  position: absolute;
  cursor: pointer;
  transition: transform 0.3s ease;
}

/* 具体城市位置 - 根据效果图调整 */
.city-yizheng {
  top: 49%;
  left: 5%;
}

.city-laian {
  top: 30%;
  left: 19%;
}

.city-liuhe {
  top: 48%;
  left: 33%;
}

.city-jinhu {
  top: 55%;
  left: 53%;
}

.city-dingyuan {
  top: 45%;
  right: 20%;
}

.city-xuyi {
  top: 52%;
  right: 6%;
}

.city-item:hover {
  transform: translateY(-5px);
}


.point-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: pointPulse 2s ease-in-out infinite;
}

@keyframes pointPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

/* 仪征城市样式 */
.city-yizheng .city-landmark {
  position: absolute;
  top: -50px;
  transform: translateX(-10%);
  animation: landmarkFloat 4s ease-in-out infinite;
  z-index: 10;
}

.city-yizheng .city-name {
  position: absolute;
  top: -85px;
  left: 40px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 3s ease-in-out infinite;
  z-index: 9;
}

.city-yizheng .position-point {
  position: absolute;
  top: -3px;
  left: 35px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 来安城市样式 */
.city-laian .city-landmark {
  position: absolute;
  top: -40px;
  left: 25px;
  transform: translateX(-50%);
  animation: landmarkFloat 3.8s ease-in-out infinite;
  z-index: 10;
}

.city-laian .city-name {
  position: absolute;
  top: 35px;
  left: 78px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 3.2s ease-in-out infinite;
  z-index: 9;
}

.city-laian .position-point {
  position: absolute;
  top: 0;
  left: 70px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 六合城市样式 */
.city-liuhe .city-landmark {
  position: absolute;
  top: -35px;
  left: 25px;
  transform: translateX(-50%);
  animation: landmarkFloat 3.6s ease-in-out infinite;
  z-index: 10;
}

.city-liuhe .city-name {
  position: absolute;
  top: 35px;
  left: 78px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 3.4s ease-in-out infinite;
  z-index: 9;
}

.city-liuhe .position-point {
  position: absolute;
  top: 5px;
  left: 70px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 金湖城市样式 */
.city-jinhu .city-landmark {
  position: absolute;
  top: -40px;
  left: 10px;
  transform: translateX(-50%);
  animation: landmarkFloat 3.4s ease-in-out infinite;
  z-index: 10;
}

.city-jinhu .city-name {
  position: absolute;
  top: 30px;
  left: 48px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 3.6s ease-in-out infinite;
  z-index: 9;
}

.city-jinhu .position-point {
  position: absolute;
  top: 0;
  left: 40px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 定远城市样式 */
.city-dingyuan .city-landmark {
  position: absolute;
  top: -60px;
  left: -70px;
  transform: translateX(-50%);
  animation: landmarkFloat 3.2s ease-in-out infinite;
  z-index: 10;
}

.city-dingyuan .city-name {
  position: absolute;
  top: 30px;
  left: -32px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 3.8s ease-in-out infinite;
  z-index: 9;
}

.city-dingyuan .position-point {
  position: absolute;
  top: 0;
  left: -40px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 盱眙城市样式 */
.city-xuyi .city-landmark {
  position: absolute;
  top: -40px;
  left: -50px;
  transform: translateX(-50%);
  animation: landmarkFloat 3s ease-in-out infinite;
  z-index: 10;
}

.city-xuyi .city-name {
  position: absolute;
  top: -70px;
  left: -25px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 4s ease-in-out infinite;
  z-index: 9;
}

.city-xuyi .position-point {
  position: absolute;
  top: 5px;
  left: -30px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 公共样式 */
.landmark-image {
  height: 60px !important;
  width: auto !important;
  max-width: none !important; /* 覆盖全局 max-width: 100% */
  min-width: auto !important;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
}

.city-item:hover .landmark-image {
  transform: scale(1.1) translateY(-5px);
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.city-item:hover .city-name {
  transform: translateX(-50%) translateY(-3px);
}

.city-item:hover .position-point {
  transform: translateY(-2px);
}

/* 城市名称静态动效 */
@keyframes cityNameFloat {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-3px);
  }
}

/* 城市图片静态动效 */
@keyframes landmarkFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

/* 全屏透明模糊遮罩样式 */
.city-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Vue Transition 进场动效 */
.modal-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-enter-active .overlay-image {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
}

.modal-enter-from {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

.modal-enter-from .overlay-image {
  opacity: 0;
  transform: scale(0.3) rotate(-90deg);
}

/* Vue Transition 出场动效 */
.modal-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-leave-active .overlay-image {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;
}

.modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

.modal-leave-to .overlay-image {
  opacity: 0;
  transform: scale(0.5) rotate(-45deg);
}

/* 彩带动效 - 优化旗帜飘动效果 */
.animate-ribbon {
  animation: ribbonWave 2.2s ease-in-out infinite, ribbonSway 3.5s ease-in-out infinite;
  transform-origin: left center;
}

@keyframes ribbonWave {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scaleX(1);
    opacity: 0.8;
  }
  25% {
    transform: translateY(-6px) rotate(-1.5deg) scaleX(1.03);
    opacity: 0.85;
  }
  50% {
    transform: translateY(-12px) rotate(3deg) scaleX(0.96);
    opacity: 0.9;
  }
  75% {
    transform: translateY(-5px) rotate(-1deg) scaleX(1.02);
    opacity: 0.85;
  }
}

@keyframes ribbonSway {
  0%, 100% {
    transform: translateX(0px) skewX(0deg);
  }
  33% {
    transform: translateX(4px) skewX(2deg);
  }
  66% {
    transform: translateX(-3px) skewX(-1.5deg);
  }
}

</style>