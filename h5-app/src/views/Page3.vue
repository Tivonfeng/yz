<template>
  <div 
    class="page3 landscape-forced"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
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

    <!-- 提示文字 -->
    <div class="tip-text" v-motion="tipMotion">
      点击城市名片，开启探索之旅
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
      <div 
        v-if="isModalVisible" 
        class="city-modal-overlay"
      >
        <img 
          src="@/assets/yz/03/角标.png" 
          alt="角标装饰" 
          class="overlay-image"
        />
        <!-- 彩带装饰 -->
        <img src="@/assets/yz/04/彩带1.png" class="absolute bottom-[4%] left-[8%] w-30 h-30 opacity-80 pointer-events-none z-20 animate-ribbon">
        <img src="@/assets/yz/04/彩带2.png" class="absolute bottom-[1%] right-[9%] w-30 h-30 opacity-80 pointer-events-none z-20 animate-ribbon">
		<img src="@/assets/yz/04/五角星.png" class="absolute top-[12%] right-[-1%] w-20 opacity-80 pointer-events-none z-20 animate-ribbon scale-x-[-1] animate-twinkle">
        <!-- 关闭按钮 - 右边中间位置 -->
        <button 
          ref="closeBtn"
          class="absolute right-4 top-[56%] transform -translate-y-1/2 w-9 h-9 backdrop-blur-md bg-white/95 hover:bg-red-50/98 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl z-50 group border-2 border-white/70 hover:border-red-300/80 animate-pulse-gentle close-btn"
          @click="handleCloseClick" 
          aria-label="关闭"
        >
          <svg ref="closeIcon" class="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-all duration-500 group-hover:rotate-45 close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 6l12 12M6 18L18 6"/>
          </svg>
        </button>
        
		<CityModal v-if="selectedCityData && isModalVisible" :cityData="selectedCityData" @close="closeCityModal"></CityModal>
      </div>
    </Transition>

    <!-- 手势滑动提示 - 仅在模态框关闭时显示 -->
    <div v-show="!isModalVisible" class="swipe-hint" v-motion="swipeHintMotion">
      <!-- 向左箭头动效 -->
      <div class="arrow-container">
        <span class="arrow" v-for="i in 5" :key="i" :style="{ animationDelay: (i - 1) * 0.2 + 's' }">‹</span>
      </div>
      <img 
        src="@/assets/yz/01/hand.png" 
        alt="滑动手势" 
        class="hand-gesture"
        :class="{ 'swiping': isAnimating }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import CityModal from '@/components/CityModal.vue'

const router = useRouter()
const isAnimating = ref(false)

// 触摸事件相关
let startX = 0
let startY = 0
let startTime = 0
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

// 提示文字动画
const tipMotion = computed(() => ({
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1,
    y: 0,
    transition: { 
      delay: 900,
      duration: 800,
      ease: [0.34, 1.56, 0.64, 1]
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
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E4%BB%AA%E5%BE%81/%E6%97%A0logo%20%E4%BB%AA%E5%BE%81%E7%AF%87%EF%BC%88%E4%B8%80%EF%BC%89%EF%BC%9A%E5%BB%BA%E7%AB%8B%E5%85%9A%E6%94%BF%E5%86%9B%E7%BB%84%E7%BB%87%20%E6%9E%84%E7%AD%91%E6%8A%97%E6%88%98%E5%9D%9A%201.mp4',
      },
	  {
        description: '1939年12月18日，日伪军800余人分三路合击月塘集。苏皖支队避其锋芒，主力转移至移居集隐蔽。傍晚利用地形和群众支援，反击压缩敌人至北大庙，激战三小时收复月塘。此战歼敌90余人，缴获枪械40余支，极大鼓舞军民斗志，成为新四军在仪征的里程碑之战。',
        title: '月塘反击战',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E4%BB%AA%E5%BE%81/%E6%97%A0logo%20%E4%BB%AA%E5%BE%81%E7%AF%87%EF%BC%88%E4%BA%8C%EF%BC%89%EF%BC%9A%E9%A6%96%E6%88%98%E9%9C%87%E5%AF%92%E5%A4%9C%20%E6%9C%88%E5%A1%98%E4%BF%9D%E5%8D%AB%E6%88%98%E7%82%B9%E7%87%83%201.mp4',
      },
	  {
        description: '1941年春，日军推行“囚笼政策”，修筑公路工事，企图分割根据地。新四军二师多路出击，攻克谢集、刘集等据点，伏击援敌。4月16-17日，运用“梅花桩战术”在金牛山重创日伪军，歼敌500余人，缴获机枪、掷弹筒等武器，粉碎大规模扫荡，极大地增强了军民坚持敌后抗日斗争的信心。',
        title: '金牛山战斗​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E4%BB%AA%E5%BE%81/%E6%97%A0logo%20%E4%BB%AA%E5%BE%81%E7%AF%87%EF%BC%88%E4%B8%89%EF%BC%89%EF%BC%9A%E5%8F%8D%E7%82%B9%E7%BA%BF%E4%BD%9C%E6%88%98%20%E6%89%93%E7%A0%B4%E2%80%9C%E5%9B%9A%E7%AC%BC%E2%80%9D%E5%8C%85%201.mp4',
      },
	  {
        description: '月塘位于淮南根据地中心，成为华中局与苏南、上海地下党交通枢纽，三条秘密线路贯通南北，以茶食商行等为掩护，护送近千名干部、进步青年和领导人安全往来，转运重要文件和军需物资，从未发生问题，成为抗战时期重要生命线。',
        title: '秘密交通线​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E4%BB%AA%E5%BE%81/%E6%97%A0logo%20%E4%BB%AA%E5%BE%81%E7%AF%87%EF%BC%88%E5%9B%9B%EF%BC%89%EF%BC%9A%20%E6%9A%97%E7%BA%BF%E8%BF%9E%E5%B1%B1%E6%B2%B3%20%E5%9C%B0%E4%B8%8B%E4%BA%A4%E9%80%9A%E7%BA%BF%E6%B2%9F%201.mp4',
      },
	  {
        description: '1939年，曹兰田、陆毅等组建曹集民兵，从农抗会发展为地方武装，配合主力作战，破坏交通桥梁，掩护群众转移。两年内参加战斗50余次，歼敌100余人，逮捕叛徒特务20多人。1942年，陆毅获淮南路东英模大会嘉奖，曹集民兵被誉为“名闻淮南路东的民兵英雄集体”，其爱国精神永载史册。',
        title: '民兵英雄誉​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E4%BB%AA%E5%BE%81/%E6%97%A0logo%20%E4%BB%AA%E5%BE%81%E7%AF%87%EF%BC%88%E4%BA%94%EF%BC%89%EF%BC%9A%E7%A1%9D%E7%83%9F%E7%A0%BA%E7%AD%8B%E9%AA%A8%20%E6%9B%B9%E9%9B%86%E6%B0%91%E5%85%B5%E9%93%B8%E5%B0%B1%E4%B8%8D%201.mp4',
      },
    ]
  },
  laian: {
    name: '来安',
	historyItems: [
      {
        description: '罗炳辉将军率新四军三打来安城，首创"梅花桩战术"等经典战法，以少胜多巩固皖东抗日根据地，彰显我军卓越军事智慧与抗战精神。',
        title: '三打来安城​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E6%9D%A5%E5%AE%89/%E6%9D%A5%E5%AE%89%EF%BC%9A%E7%BD%97%E7%82%B3%E8%BE%89%20%E5%96%84%E7%94%A8%E9%AA%91%E5%85%B5%E7%9A%84%E6%8A%97%E6%97%A5%E5%90%8D%E5%B0%86%EF%BC%88%E6%9C%89%E5%AD%97%E7%89%88%EF%BC%89%201.mp4',
      },
	  {
        description: '半塔保卫战是新四军以少胜多、固守待援的经典战例。1940年春，新四军2000余官兵顽强抵抗国民党万余兵力进攻，最终配合东援主力取得胜利，为华中抗日根据地巩固发展奠定重要基础。',
        title: '半塔保卫战​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E6%9D%A5%E5%AE%89/%E6%9D%A5%E5%AE%89%EF%BC%9A%E6%96%B0%E5%9B%9B%E5%86%9B%E5%9B%BA%E5%AE%88%E5%BE%85%E6%8F%B4%E7%9A%84%E7%BB%8F%E5%85%B8%E8%8C%83%E4%BE%8B%20%E5%8D%8A%E5%A1%94%E4%BF%9D%E5%8D%AB%E6%88%98%EF%BC%88%E6%9C%89%E5%AD%97%E7%89%88%EF%BC%89%201.mp4',
      },
	  {
        description: '皖东女英雄侯静波，19岁壮烈牺牲。她宣传抗日、发动群众，被叛徒出卖后坚贞不屈，英勇就义。其精神永存，家乡静波村以她命名。',
        title: '英雄侯静波​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E6%9D%A5%E5%AE%89/%E6%9D%A5%E5%AE%89%EF%BC%9A%E4%BE%AF%E9%9D%99%E6%B3%A2%20%E7%9A%96%E4%B8%9C%E5%A4%A7%E5%9C%B0%E7%9A%84%E2%80%9C%E5%88%98%E8%83%A1%E5%85%B0%E2%80%9D%EF%BC%88%E6%9C%89%E5%AD%97%E7%89%88%EF%BC%89%201.mp4',
      },
    ]
  },
  liuhe: {
    name: '六合',
	historyItems: [
      {
        description: '六合竹镇抗日民主政府纪念馆见证烽火岁月：新四军英勇作战，统一战线凝聚民心，革命精神永续传承。',
        title: '竹镇纪念馆​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E5%85%AD%E5%90%88/%E4%B9%8B%E4%B8%80%E2%80%94%E2%80%94%E7%AB%B9%E9%95%87%E6%8A%97%E6%97%A5%E6%B0%91%E4%B8%BB%E6%94%BF%E5%BA%9C%201.mp4',
      },
	  {
        description: '烽火硝烟中诞生的竹镇派出所，是新四军在淮南路东设立的首个公安机构。80多年来，“三不走”精神薪火相传，如今民警以新“三不走”守护百姓，续写红色基因的时代新篇。',
        title: '精神薪火传​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E5%85%AD%E5%90%88/%E4%B9%8B%E4%BA%8C%E2%80%94%E2%80%94%E7%AB%B9%E9%95%87%E6%96%B0%E5%9B%9B%E5%86%9B%E6%B4%BE%E5%87%BA%E6%89%80%201.mp4',
      },
	  {
        description: '《归队》讲述抗战英烈张凤鸣迁葬桂子山陵园，与战友团聚。守陵人与家属共同守护英雄记忆，传承牺牲精神，见证硝烟散尽、忠魂永存。',
        title: '忠魂归队颂​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E5%85%AD%E5%90%88/%E4%B9%8B%E4%B8%89%E2%80%94%E2%80%94%E5%BD%92%E9%98%9F%201.mp4',
      },
    ]
  },
  jinhu: {
    name: '金湖',
	historyItems: [
      {
        description: '80多年前，军工英雄吴运铎在金湖艰苦条件下，带领群众自制弹药，身负重伤仍坚持科研，成功研制枪榴弹助力抗战，被誉为中国“保尔·柯察金”。其精神至今激励后人。',
        title: '军工英雄颂',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E9%87%91%E6%B9%96/%E9%87%91%E6%B9%96%201.mp4',
      },
    ]
  },
  dingyuan: {
    name: '定远',
	historyItems: [
      {
        description: '80 多年前，面对国民党顽固派进攻，刘少奇、徐海东等指挥新四军打响定远自卫反击战。将士们协同作战 7 天获胜，建华中首个县级抗日民主政权，为抗战胜利筑牢屏障，精神永垂。',
        title: '定远自卫战​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E5%AE%9A%E8%BF%9C/%E7%83%BD%E7%81%AB%E7%AC%AC%E4%BA%8C%E5%B8%88%E5%AE%89%E5%BE%BD%E5%AE%9A%E8%BF%9C%E7%AF%87%EF%BC%88%E4%B8%80%EF%BC%89%E5%BE%90%E6%B5%B7%E4%B8%9C%EF%BC%9A%E5%AF%B9%E4%B8%AD%E5%9B%BD%E9%9D%A9%E5%91%BD%E6%9C%89%E5%A4%A7%E5%8A%9F%E7%9A%84%E4%BA%BA%201.mp4',
      },
	  {
        description: '80 多年前，“虎将” 徐海东带病赴华中，任新四军江北指挥部副指挥，指挥周家岗反 “扫荡” 首胜日军。他 9 次负伤仍坚守，以忠诚勇猛书写传奇，激励后人传承革命精神。',
        title: '虎将徐海东​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E5%AE%9A%E8%BF%9C/%E7%83%BD%E7%81%AB%E7%AC%AC%E4%BA%8C%E5%B8%88%E5%AE%89%E5%BE%BD%E5%AE%9A%E8%BF%9C%E7%AF%87%EF%BC%88%E4%BA%8C%EF%BC%89%E7%AD%91%E7%89%A2%E5%8D%8E%E4%B8%AD%E6%8A%97%E6%97%A5%E6%A0%B9%E6%8D%AE%E5%9C%B0%E7%9A%84%E5%9D%9A%E5%AE%9E%E5%B1%8F%E9%9A%9C%E2%80%94%E2%80%94%E5%AE%9A%E8%BF%9C%E8%87%AA%E5%8D%AB%E5%8F%8D%E5%87%BB%E6%88%98%201.mp4',
      },
	  {
        description: '80 多年前，定远作为抗日根据地核心，新四军二师浴血奋战。王小庙安葬 1200 余名无名烈士，如今 “寻亲队伍” 与学界为其寻名，英烈精神永被铭记。',
        title: '英烈永铭记​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E5%AE%9A%E8%BF%9C/%E7%83%BD%E7%81%AB%E7%AC%AC%E4%BA%8C%E5%B8%88%E5%AE%89%E5%BE%BD%E5%AE%9A%E8%BF%9C%E7%AF%87%EF%BC%88%E4%B8%89%EF%BC%89174%E5%BA%A7%E5%A2%93%E7%A2%91%E6%97%A0%E5%A3%B0%EF%BC%8C1200%E5%90%8D%E8%8B%B1%E9%AD%82%E9%95%BF%E7%9C%A0%E2%80%94%E2%80%94%E8%AE%BF%E7%8E%8B%E5%B0%8F%E5%BA%99%E6%97%A0%E5%90%8D%E7%83%88%E5%A3%AB%E9%99%B5%E5%9B%AD%201.mp4',
      },
    ]
  },
  xuyi: {
    name: '盱眙',
	historyItems: [
      {
        description: '1943年1月，新四军军部移驻黄花塘两年零八个月，作为华中抗战指挥中心，粉碎敌人进攻、壮大队伍、开辟根据地，为抗战胜利贡献卓著。',
        title: '华中指挥部',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E7%9B%B1%E7%9C%99/%E6%9C%89%E7%89%87%E5%A4%B4%20%20%E6%96%B0%E5%9B%9B%E5%86%9B%E7%9A%84%E7%83%BD%E7%81%AB%E5%B2%81%E6%9C%88%201.mp4',
      },
	  {
        description: '陈毅在黄花塘工作期间，恰逢房东家娶亲，因条件艰苦，以一块红布作为结婚贺礼相赠，该红布被房东家保存近30多年后，于2003年捐赠给纪念馆，成为新四军与老百姓鱼水深情的见证。',
        title: '​红布寄深情',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E7%9B%B1%E7%9C%99/%E6%9C%89%E7%89%87%E5%A4%B4%20%20%E9%97%A8%E5%B8%98%E7%9A%84%E6%95%85%E4%BA%8B%201.mp4',
      },
	  {
        description: '黄花塘原名黄昏塘，因景致引“战地黄花分外香”改名，军部迁此因抗战形势、有利地理及好群众基础，驻扎两年零八个月后迁淮阴再北上山东。',
        title: '黄花塘之名​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E7%9B%B1%E7%9C%99/%E6%9C%89%E7%89%87%E5%A4%B4%20%20%E9%BB%84%E8%8A%B1%E5%A1%98%E7%9A%84%E6%88%98%E7%95%A5%E5%9C%B0%E4%BD%8D%201.mp4',
      },
	  {
        description: '抗战时期，盱眙群众积极拥护新四军，1943至1944年自然灾害严重，仍为新四军送大量粮食、烧草；新四军通过制定《拥政爱民公约》、开展“双拥”活动及遵守“五不走”原则，与盱眙人民建立起鱼水深情。',
        title: '鱼水情谊深',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E7%9B%B1%E7%9C%99/%E6%9C%89%E7%89%87%E5%A4%B4%20%20%E6%96%B0%E5%9B%9B%E5%86%9B%E5%85%AC%E5%B8%83%E6%8B%A5%E6%94%BF%E7%88%B1%E6%B0%91%E5%85%AC%E7%BA%A6%201.mp4',
      },
	  {
        description: '1943年春，新四军文艺战士刘鹏为《白菜谣》谱曲，歌曲传唱华中根据地，彰显军民鱼水情与抗敌决心；同年年底，他高烧40多度仍坚持军部慰问演出，后因牙疳缺医少药以身殉职，年仅16岁，《白菜谣》至今仍被传唱。',
        title: '​白菜谣永传​​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E7%9B%B1%E7%9C%99/%E6%9C%89%E7%89%87%E5%A4%B4%20%20%E5%BD%93%E5%85%B5%E8%A6%81%E5%BD%93%E6%96%B0%E5%9B%9B%E5%86%9B%201.mp4',
      },
      {
        description: '抗战期间，新四军作战科科长之女因母亲无奶水，由黄花塘乳娘一家家喂养长大。建国后，其女谭晓雯多次返乡感恩，“百家奶难忘黄花塘”的故事至今流传。',
        title: '​百家奶情念​​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E7%9B%B1%E7%9C%99/%E6%9C%89%E7%89%87%E5%A4%B4%20%20%E9%BB%84%E8%8A%B1%E5%A1%98%E4%B9%B3%E5%A8%98%201.mp4',
      },
      {
        description: '华中局部反攻时，盱眙涌现参军热潮，有“一母送四子”的真实故事；1940至1945年，盱眙4000多名热血儿女参加新四军，全县近八成革命烈士为抗战时期牺牲的相关人员，这源于军民互当亲人的深厚情谊。',
        title: '​一母送四子​​',
        src: 'https://qiniuyun.lqcode.fun/yzdst/%E7%9B%B1%E7%9C%99/%E6%9C%89%E7%89%87%E5%A4%B4%20%20%E6%8B%A5%E5%86%9B%E8%BF%90%E5%8A%A8%201.mp4',
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

// 关闭按钮和图标的引用
const closeBtn = ref<HTMLButtonElement | null>(null)
const closeIcon = ref<SVGSVGElement | null>(null)

// 处理关闭按钮点击，优化动画效果
const handleCloseClick = () => {
  // 防止重复点击
  if (closeBtn.value?.classList.contains('clicked')) {
    return
  }
  
  // 添加点击动画类
  if (closeBtn.value) {
    closeBtn.value.classList.add('clicked', 'closing')
  }
  if (closeIcon.value) {
    closeIcon.value.classList.add('rotating')
  }
  
  // 分阶段关闭动画
  setTimeout(() => {
    // 开始模态框退出动画
    closeCityModal()
  }, 200) // 先让按钮动画播放一段时间
  
  // 清理动画类
  setTimeout(() => {
    if (closeBtn.value) {
      closeBtn.value.classList.remove('clicked', 'closing')
    }
    if (closeIcon.value) {
      closeIcon.value.classList.remove('rotating')
    }
  }, 800) // 总动画时长
}

// 滑动提示动画
const swipeHintMotion = computed(() => ({
  initial: { opacity: 0, x: 100 },
  enter: { 
    opacity: 1, 
    x: 0,
    transition: { 
      delay: 2500,
      duration: 800,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}))

// 触摸开始
const handleTouchStart = (e: TouchEvent) => {
  // 如果模态框打开或正在动画中，阻止滑动
  if (isAnimating.value || isModalVisible.value) return
  
  const touch = e.touches[0]
  startX = touch.clientX
  startY = touch.clientY
  startTime = Date.now()
}

// 触摸结束，检测滑动手势
const handleTouchEnd = (e: TouchEvent) => {
  // 如果模态框打开或正在动画中，阻止滑动
  if (isAnimating.value || isModalVisible.value) return
  
  const touch = e.changedTouches[0]
  const endX = touch.clientX
  const endY = touch.clientY
  const endTime = Date.now()
  
  const deltaX = endX - startX
  const deltaY = endY - startY
  const deltaTime = endTime - startTime
  
  // 横屏模式下检测向左滑动手势（在设备坐标系中是向上滑动）
  if (
    deltaY < -80 && 
    Math.abs(deltaX) < 150 && 
    deltaTime < 500
  ) {
    triggerSwipeAnimation()
  }
}

// 触发滑动动画和跳转
const triggerSwipeAnimation = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  
  // 跳转到结语页面
  setTimeout(() => {
    router.push('/page4')
  }, 1000)
}

// 处理触摸事件（移动端优化）
// const handleTouchStartButton = () => {
//   if (closeBtn.value) {
//     closeBtn.value.classList.add('touch-active')
//     setTimeout(() => {
//       closeBtn.value?.classList.remove('touch-active')
//     }, 150)
//   }
// }


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

/* Vue Transition 进场动效 - 优化版本 */
.modal-enter-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-enter-active .overlay-image {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
}

.modal-enter-active .close-btn {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
}

.modal-enter-from {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  transform: scale(1.05);
}

.modal-enter-from .overlay-image {
  opacity: 0;
  transform: scale(0.2) rotate(-120deg);
}

.modal-enter-from .close-btn {
  opacity: 0;
  transform: translateY(-50%) scale(0.3) rotate(-90deg);
}

/* Vue Transition 出场动效 - 优化版本 */
.modal-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-leave-active .overlay-image {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s;
}

.modal-leave-active .close-btn {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  transform: scale(0.98);
}

.modal-leave-to .overlay-image {
  opacity: 0;
  transform: scale(0.3) rotate(-180deg);
}

.modal-leave-to .close-btn {
  opacity: 0;
  transform: translateY(-50%) scale(0.5) rotate(180deg);
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

/* 提示文字样式 */
.tip-text {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  font-size: 16px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.85);
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid rgba(139, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  letter-spacing: 1px;
  animation: tipFloat 3s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
}

@keyframes tipFloat {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* 关闭按钮动画 - 优化版本 */
.animate-pulse-gentle {
  animation: pulseGentle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulseGentle {
  0%, 100% {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12), 0 0 0 0 rgba(239, 68, 68, 0.3);
    transform: translateY(-50%) scale(1);
  }
  50% {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18), 0 0 0 8px rgba(239, 68, 68, 0.08);
    transform: translateY(-50%) scale(1.05);
  }
}

/* 关闭按钮点击动效 - 多阶段动画 */
.close-btn.clicked {
  animation: buttonClickSequence 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes buttonClickSequence {
  0% {
    transform: translateY(-50%) scale(1);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
  30% {
    transform: translateY(-50%) scale(0.85);
    background: rgba(254, 226, 226, 0.98);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
  60% {
    transform: translateY(-50%) scale(1.1);
    background: rgba(252, 165, 165, 0.95);
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
  }
  100% {
    transform: translateY(-50%) scale(1.05);
    background: rgba(248, 113, 113, 0.9);
    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.5);
  }
}

/* 关闭按钮关闭状态 */
.close-btn.closing {
  animation: buttonClosing 0.4s ease-out forwards;
}

@keyframes buttonClosing {
  0% {
    opacity: 1;
    transform: translateY(-50%) scale(1.05);
  }
  100% {
    opacity: 0.6;
    transform: translateY(-50%) scale(0.8) rotate(90deg);
  }
}

/* 图标旋转动效 - 更流畅 */
.close-icon.rotating {
  animation: iconRotateImproved 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes iconRotateImproved {
  0% {
    transform: rotate(0deg) scale(1);
    color: #374151;
  }
  25% {
    transform: rotate(90deg) scale(1.2);
    color: #dc2626;
  }
  50% {
    transform: rotate(180deg) scale(0.8);
    color: #b91c1c;
  }
  75% {
    transform: rotate(270deg) scale(1.1);
    color: #991b1b;
  }
  100% {
    transform: rotate(360deg) scale(1);
    color: #7f1d1d;
  }
}

/* 鼠标悬停时的增强效果 */
.close-btn:hover {
  background: rgba(254, 242, 242, 0.98) !important;
  border-color: rgba(239, 68, 68, 0.6) !important;
  box-shadow: 0 12px 32px rgba(239, 68, 68, 0.25) !important;
}

.close-btn:hover .close-icon {
  transform: rotate(45deg) scale(1.1);
  color: #dc2626;
  filter: drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3));
}

/* 触摸激活效果（移动端） */
.close-btn.touch-active {
  transform: translateY(-50%) scale(0.95);
  background: rgba(248, 113, 113, 0.9);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
  transition: all 0.15s ease-out;
}

/* 模态框遮罩增强效果 */
.city-modal-overlay {
  cursor: pointer;
  animation: overlayFadeIn 0.4s ease-out;
}

@keyframes overlayFadeIn {
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.3);
  }
}

/* 模态框内容区域不触发关闭 */
.city-modal-overlay > div:not(.close-btn) {
  cursor: default;
}

/* 按键聚焦状态优化 */
.close-btn:focus {
  outline: 2px solid rgba(239, 68, 68, 0.5);
  outline-offset: 2px;
}

/* 五角星闪烁动画 */
.animate-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* 手势滑动提示 */
.swipe-hint {
  position: absolute;
  right: 10%;
  bottom: 5%;
  transform: translateY(-50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  user-select: none;
  pointer-events: none;
}

.hand-gesture {
  width: 45px;
  height: 45px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
  animation: float 2s ease-in-out infinite;
}

.hand-gesture:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.4));
}

/* 滑动动画 */
.hand-gesture.swiping {
  animation: swipeLeft 2s ease-in-out forwards;
}

/* 箭头容器 */
.arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin: 3px 0;
  height: 24px;
}

/* 箭头样式 */
.arrow {
  font-size: 30px;
  font-weight: bold;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  animation: slideLeft 1.5s ease-in-out infinite;
  opacity: 0;
}


/* 箭头滑动动画 */
@keyframes slideLeft {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  50% {
    opacity: 1;
    transform: translateX(-10px);
  }
  100% {
    opacity: 0;
    transform: translateX(-30px);
  }
}

/* 滑动动画 */
@keyframes swipeLeft {
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateX(-100px) scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: translateX(-200px) scale(0.6);
    opacity: 0;
  }
}

/* 浮动动画 */
@keyframes float {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-8px);
  }
}

/* 脉冲动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

</style>