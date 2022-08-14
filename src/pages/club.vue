<template>
  <div class="club">
    <section class="slider container">
      <div class="slider__item">
        <span class="slider__caption">CHUO</span>
      </div>
      <div class="slider__item">
        <span class="slider__caption">SOFT<br>TENNIS</span>
      </div>
      <div class="slider__item">
        <span class="slider__caption">CLUB</span>
      </div>
    </section>

    <section class="concept">
      <title-primary :title="title.concept"/>
      <div class="concept__balls">
        <div class="concept__ball" v-for="concept in contents.concept" @click="tabChange(concept.id)">
          <input type="radio" :value="concept.id" class="concept__radio">
          <label :for="concept.title.en" class="concept__label">{{ concept.title.en.toUpperCase() }}</label>
        </div>
      </div>
      <tab :items="contents.concept" ref="TabComponent"/>
    </section>

    <section class="practice">
      <title-primary :title="title.practice"/>
      <!-- 練習情報テーブル -->
      <table-primary :table="table.practice"/>
      <!-- マップ -->
      <div class="practice__map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1621.2667723739717!2d139.3969191414313!3d35.63922419623377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e3e36092b1eb%3A0xbda5deeac6e07b45!2z5Lit5aSu5aSn5a2mIOWkmuaRqeOCreODo-ODs-ODkeOCuSDjgr3jg5Xjg4jjg4bjg4vjgrnjgrPjg7zjg4g!5e0!3m2!1sja!2sjp!4v1606833350051!5m2!1sja!2sjp"
          frameborder="0"
          class="practice__map-iframe"
          aria-hidden="false"
          tabindex="0">
        </iframe>
        <span class="practice__map-attention">※練習時間・活動期間・オフについては年度や体制、状況によって変動します。</span>
      </div>
      <!-- コート写真 -->
      <div class="practice__images">
        <swiper
          :modules="[Navigation, Pagination]"
          :slides-per-view="1"
          :breakpoints="swiperOptions.breakpoint.courtImages"
          :loop="true"
          navigation
          :pagination="swiperOptions.pagination"
        >
          <swiper-slide v-for="item in image.court">
            <Image :src="item.src" :alt="item.alt"/>
            <caption class="practice__caption">{{ item.alt }}</caption>
          </swiper-slide>
        </swiper>
      </div>
      <!-- スケジュール -->
      <div class="practice__schedule">
        <table-primary :table="table.schedule"/>
      </div>
    </section>

    <section class="dormitory">
      <title-primary :title="title.dormitory"/>
      <p class="dormitory__lead">
        スポーツ推薦入学者は、原則、南平寮にてチームメイトと寝食を共にします。<br>
        生活を共有することでよりチームとして動きやすく、理解しあえる関係を構築するためです。<br><br>
        寮生活を経験することは、社会人で基本となる「自由」と「責任」を体感し、自立心を育む手助けにもなります。<br>
        南平寮では部活動と学業に専念できる生活環境が整っており、思い出に残る充実した大学生活を送ることができます。
      </p>
      <card :items="contents.dormitory" :column="dormitoryTicketColumn">
        <template v-slot:content="dormitory">
          <!-- アイコン -->
          <div class="dormitory__ticket-icon">
            <nuxt-svg :name="dormitory.item.icon"/>
          </div>
          <!-- テキスト -->
          <div class="dormitory__ticket-text-container">
            <p class="dormitory__ticket-text">
              {{ dormitory.item.text }}
            </p>
            <div class="dormitory__ticket-complement-container" v-if="dormitory.item.complements.length !== 0">
              <span class="dormitory__ticket-complement" v-for="complement in dormitory.item.complements">
                {{ complement }}
              </span>
            </div>
          </div>
        </template>
      </card>
      <div class="dormitory__images">
        <swiper
          :modules="[Navigation, Pagination]"
          :slides-per-view="1"
          :breakpoints="swiperOptions.breakpoint.dormitory"
          :loop="true"
          navigation
          :pagination="swiperOptions.pagination"
        >
          <swiper-slide v-for="item in image.dormitory">
            <Image :src="item.src" :alt="item.alt"/>
            <caption class="practice__caption">{{ item.alt }}</caption>
          </swiper-slide>
        </swiper>
      </div>
    </section>

    <section class="member container">
      <title-primary :title="title.member" color="white"/>

      <!-- スライダー or ロード -->
      <div class="member__slider">
        <swiper
          v-if="players"
          :modules="[Navigation, Pagination]"
          :slides-per-view="1"
          :breakpoints="swiperOptions.breakpoint.memberCard"
          :loop="true"
          navigation
          :pagination="swiperOptions.dynamicPagination"
        >
          <swiper-slide v-for="player in players.filter(e => e.grade == 4)">
            <card-user :item="player"/>
          </swiper-slide>
        </swiper>

        <div class="member__load" v-else>
          <Load color="white"/>
        </div>
      </div>

      <div class="member__count">
        <table-primary :table="playersCountTable" color="white"/>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
// Swiper import
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// json data
import table from "@/assets/json/table.json";
import image from "@/assets/json/image.json";
import contents from "@/assets/json/contents.json";
import title from "@/assets/json/title.json";
import swiperOptions from "@/assets/json/swiper.json";
// import member from "@/assets/json/mock/member.json";

// api
import { Members, Table } from "@/types/interface";

// タブの遷移処理
const TabComponent = ref();
const tabChange = (id: number): void => {
  TabComponent.value.change(id);
}

// 寮カードのカラム数
const { responsiveDevice } = useWindow();
const dormitoryTicketColumn: number = (responsiveDevice.value === 'pc') ? 2 : 1;

// メンバー情報を取得
const { data: players } = useFetch<Members[]>('/api/players', {
  method: 'GET',
});

// 部員数テーブルの生成
const playersCountTable = computed<Table>(() => {
  return {
    title: '部員数',
    body: [
      { key: '1年生', value: (players.value) ? `${players.value.filter(e => e.grade == 1).length}名` : '0名' },
      { key: '2年生', value: (players.value) ? `${players.value.filter(e => e.grade == 2).length}名` : '0名' },
      { key: '3年生', value: (players.value) ? `${players.value.filter(e => e.grade == 3).length}名` : '0名' },
      { key: '4年生', value: (players.value) ? `${players.value.filter(e => e.grade == 4).length}名` : '0名' },
    ],
  }
});
</script>

<style ${2|scoped,|} lang="scss">
.club {
  .slider {
    $this: &;
    height: 100vh;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      display: block;
      width: 90%;
      height: 90%;
      border: 2px solid color(navy);
      @include position(absolute, 0, 0, 0, 0, 11);
      margin: auto;
    }
    &::after {
      content: '@ 2022 CHUO UNIVERSITY SOFT TENNIS TEAM';
      @include flex(row nowrap, flex-end, flex-end);
      font: normal .8rem/1 arial;
      @include position(absolute, 0, 0, 0, 0, 11);
      width: 88%;
      height: 88%;
      margin: auto;
      color: color(navy);
    }
    &__item {
      width: 100%;
      height: 100%;
      @include position(absolute, $t: 0, $l: 0, $z: 10);
      // 背景設定
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      // アニメーション設定
      animation: main-visual-slider 18s 0s infinite;
      opacity: 0;

      &:nth-of-type(1) {
        background: url('@/assets/images/training01.jpg') no-repeat center center/cover;

        & > span {
          top: 15%;
          left: 15%;
        }
      }
      &:nth-of-type(2) {
        animation-delay: 6s;
        background: url('@/assets/images/support_sp.jpg') no-repeat center center/cover;

        & > span {
          top: 30%;
          left: 30%;
        }
      }
      &:nth-of-type(3) {
        animation-delay: 12s;
        background: url('@/assets/images/hakumon02.jpg') no-repeat center center/cover;

        & > span {
          bottom: 20%;
          right: 15%;
        }
      }
    }
    &__caption {
      @include position(absolute, $z: 11);
      font: bold 5rem/1 arial;
      color: transparent;
      -webkit-text-stroke: 1px color(white);

      @include mq(sm) {
        font-size: 8rem;
      }

      @include mq(md) {
        font-size: 10rem;
      }
    }
  }

  .concept {
    margin-top: interval(5);
    --boll-size: 6rem;

    @include mq(sm) {
      --boll-size: 8rem;
    }
    @include mq(md) {
      --boll-size: 10rem;
    }
    &__balls {
      @include flex(row nowrap, center, center);
      margin-bottom: interval(5);
      position: relative;
      z-index: 2;

      @include mq(sm) {
        margin-right: interval(1);
      }
    }
    &__ball {
      width: var(--boll-size);
      height: var(--boll-size);
      background-color: color(white);
      box-shadow: inset -1rem -1rem 3rem color(darkShadow);
      border-radius: radius(circle);
      position: relative;
      transition: transform .5s ease-out;

      @include mq(md) {
        cursor: pointer;
      }
      &:nth-child(1) {
        transform: rotate(10deg);
        margin-right: interval(1);

        &::after {
          transform: rotate(-10deg) translateX(10px);
        }
      }
      &:nth-child(2) {
        margin-right: interval(.5);
        transform: rotate(-8deg);

        &::after {
          transform: rotate(8deg) translateX(-8px);
        }
      }
      &:last-child {
        transform: rotate(12deg);
        margin-right: 0;

        &::after {
          transform: rotate(-12deg) translateX(5px);
        }
      }
      &::before {
        display: block;
        content: '';
        @include position(absolute, $t: calc(var(--boll-size) / 4), $l: 50%);
        transform: translateX(-50%);
        width: calc(var(--boll-size) / 25);
        height: calc(var(--boll-size) / 25);
        background-color: darken($color: blue, $amount: 10%);
        border-radius: radius(circle);
      }
      &::after {
        content: '';
        display: block;
        @include position(absolute, 0, 0, -100%, 0);
        margin: auto;
        width: 60px;
        height: 10px;
        border-radius: radius(circle);
        background: color(darkShadow);
        filter: blur(6px);
        opacity: .9;
        transition: transform .3s ease-in;
      }
      @include hover {
        transform: rotate(0);

        &::after {
          transform: rotate(0);
        }
      }
    }
    &__radio {
      display: none;
    }
    &__label {
      font: bold .7rem/1 arial;
      color: darken($color: red, $amount: .4);
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;

      @include mq(sm) {
        font: bold .8rem/1 arial;
      }
    }
  }

  .practice {
    margin-top: interval(5);

    &__map {
      padding-top: interval(5);

      &-iframe {
        width: 100%;
        aspect-ratio: 1 / 1;

        @include mq(sm) {
          aspect-ratio: 16 / 9;
        }
      }
      &-attention {
        color: color(darkblue);
        margin: interval(1) auto 0 auto;
        display: block;
        text-align: center;
        font: normal .8rem/1 arial;

        @include mq(md) {
          text-align: end;
        }
      }
    }
    &__images {
      position: relative;
      margin-top: interval(10);
      @include swiper-button(white);
    }
    &__caption {
      display: block;
      width: 100%;
      background: rgba($color: color(navy), $alpha: .6);
      color: color(white);
      font: bold .9rem/1.2 arial;
      padding: interval(1);
      @include position(absolute, $b:0, $l: 0);
    }
    &__schedule {
      margin-top: interval(5);
    }
  }

  .dormitory {
    margin-top: interval(5);

    &__lead {
      color: color(darkblue);
      padding-bottom: interval(5);

      @include mq(sm) {
        max-width: pixel(100);
        margin: 0 auto;
      }
      @include mq(md) {
        max-width: pixel(120);
      }
    }

    &__ticket {
      &-icon {
        width: 5rem;
        margin: interval(1) auto;
      }
      &-text-container {
        padding: interval(1);
      }
      &-text {
        color: color(darkblue);
        margin: 0;
        max-width: 50rem;
      }
      &-complement-container {
        @include flex(row wrap, flex-start, center, interval(1));
        padding: interval(1) 0;
      }
      &-complement {
        padding: interval(1) interval(1);
        background-color: color(lightgray);
        color: color(darkblue);
        border-radius: 1000px;
        border: 1px solid color(darkblue);
        font: bold .8rem/1 arial;
      }
    }

    &__images {
      margin-top: interval(10);
      @include swiper-button(white);
    }
  }

  .member {
    @include gradient(color(navy), color(darkblue));
    margin-top: interval(10);

    &__slider {
      padding: 0 5vw interval(5);
      @include swiper-button(darkblue);
    }

    &__load {
      height: 5rem;
    }

    &__count {
      padding: 0 5vw interval(5);
    }
  }
}
</style>
