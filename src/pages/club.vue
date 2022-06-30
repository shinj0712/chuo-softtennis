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
      <title-primary :title="{ ja: 'コンセプト', en: 'concept' }"/>
      <div class="concept__balls">
        <div class="concept__ball" v-for="concept in concepts" @click="tabChange(concept.id)">
          <input type="radio" :value="concept.id" class="concept__radio">
          <label :for="concept.title.en" class="concept__label">{{ concept.title.en.toUpperCase() }}</label>
        </div>
      </div>
      <tab :items="concepts" ref="TabComponent"/>
    </section>

    <section class="practice">
      <title-primary :title="{ ja: '練習' , en: 'practice' }"/>
      <!-- 練習情報テーブル -->
      <div class="practice__table">
        <table-primary :table="practiceTable"/>
      </div>
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
        <div class="practice__image" v-for="image in practiceCourtImages">
          <Image :src="image.src" :alt="image.alt"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { concepts, practiceTable, practiceCourtImages } = useConst();
const TabComponent = ref();

const tabChange = (id: number): void => {
  TabComponent.value.change(id);
}
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
    }

    &__image {
      // width: 100%;
      // aspect-ratio: 3 / 2;
      // @include position(absolute, $t: 0, $l: 0);

      // &:nth-of-type(1) {
      //   transform: perspective(40rem) rotateY(60deg) scale(.5) translate3d(0, 0, 0);
      // }

      // &:nth-of-type(2) {
      //   opacity: .8;
      //   transform: perspective(40rem) rotateY(60deg) scale(.5) translate3d(5rem, 5rem, 10px);
      // }

      // &:nth-of-type(3) {
      //   opacity: .6;
      //   transform: perspective(40rem) rotateY(60deg) scale(.5) translate3d(10rem, 10rem, 20px);
      // }
    }
  }
}
</style>
