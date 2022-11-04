<template>
  <div class="member">
    <section class="main-visual container">
      <nuxt-svg :svg="ChuoLogoSvg" class="main-visual__logo"/>
      <h1 class="main-visual__title">
        MEMBERS
      </h1>
      <!-- 以下だと SSGの際にブラウザ側で Warning が出るのでスクロールしないが aタグを使う -->
      <!--
      <NuxtLink to="#players" class="main-visual__button">
        <nuxt-svg :svg="DoubleArrowSvg" class="main-visual__button-logo"/>
      </NuxtLink>
      -->
      <a href="#players" class="main-visual__button">
        <nuxt-svg :svg="DoubleArrowSvg" class="main-visual__button-logo"/>
      </a>
    </section>

    <section class="users" id="players">
      <!-- title -->
      <title-primary :title="title.players"/>
      <!-- tickets -->
      <div class="users__tickets">
        <div class="users__ticket" v-for="(player, i) in players" :key="i">
          <ticket-user :user="parse(player)"/>
        </div>
      </div>
    </section>

    <section class="users" id="staff">
      <!-- title -->
      <title-primary :title="title.staff"/>
      <!-- tickets -->
      <div class="users__tickets">
        <div class="users__ticket" v-for="(staffItem, i) in staff" :key="i">
          <ticket-user :user="parse(staffItem)"/>
        </div>
      </div>
    </section>

    <section class="users" id="ob">
      <!-- title -->
      <title-primary :title="title.ob"/>
      <!-- tickets -->
      <div class="users__tickets">
        <div class="users__ticket" v-for="(ob, i) in filteringOfficer(oldBoys)" :key="i">
          <!-- ticket -->
          <ticket-user :user="parse(ob)"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
// type
import { Member } from "@/types/members";
// svg
import DoubleArrowSvg from "@/assets/svg/double_arrow_down.svg?component";
import ChuoLogoSvg from "@/assets/svg/chuo-logo.svg?component";

// json取得
const { title, constants } = useJson();
// メンバー情報を取得
const { data: players } = usePlayers();
const { data: staff }   = useStaff();
const { data: oldBoys } = useOldBoys();

useHead({
  title: '白門会',
})

/**
 * 役員でOBを絞り込みます
 *
 * @param {Member[]} data メンバー配列
 */
const filteringOfficer = (data: Member[]) => {
  const officers = constants.officers;
  // 役員で絞り込み
  const ob = data?.filter(e => e.tags.some(c => officers.includes(c)));
  // 役員配列のインデックス番号を参照して並び替え
  ob?.sort((first, second): number => {
    const firstTag = getOfficerTags(first);
    const secondTag = getOfficerTags(second);
    return officers.indexOf(firstTag) - officers.indexOf(secondTag);
  });
  return ob;
}

/**
 * 役員タグを取得します
 *
 * @param {Member} e メンバー単一オブジェクト
 */
const getOfficerTags = (e: Member): string => {
  const mergeTagsList = [...constants.officers, ...e.tags];
  const duplicatedArr = mergeTagsList.filter(tag => constants.officers.includes(tag) && e.tags.includes(tag));
  return [...new Set(duplicatedArr)][0];
}

/**
 * Proxyオブジェクトから生データを返します
 *
 * @param {Any} data Member
 */
const parse = (data: any) => {
  return JSON.parse(JSON.stringify(data));
}
</script>

<style ${2|scoped,|} lang="scss">
.log {
  color: color(darkblue);
}
.member {
  .main-visual {
    min-height: 100vh;
    min-height: 100svh;
    position: relative;
    @include gradient(color(navy), color(darkblue));
    display: grid;
    place-items: center;
    overflow: hidden;
    // ボールサイズ
    --ball-size: 7rem;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, color(lightgray), rgba(color(navy), 0));
      filter: blur(50px);
      opacity: .2;
      @include position(absolute, $t: 50%);
      transform: translateY(- 50%);
    }

    &__logo {
      width: 50rem;
      @include position(absolute, $t: 50%, $l: 20%);
      opacity: .05;

      @include mq(sm) {
        width: 60rem;
        @include position(absolute, $t: 40%, $l: 40%);
      }

      @include mq(md) {
        width: 80rem;
        @include position(absolute, $t: 40%, $l: 40%);
      }
    }

    &__title {
      font: bold 3rem/1 arial;
      letter-spacing: 1.5px;
      text-shadow: 3px 3px 0px color(orange);
    }

    &__button {
      --width: 5rem;
      width: var(--width);
      cursor: pointer;
      @include position(absolute, $b: 5%, $l: calc(50% - (var(--width) / 2)));
      animation: float-up-down 3s linear infinite normal;

      @include hover {
        & svg {
          fill: color(orange);
        }
      }
    }
  }

  .users {
    &__tickets {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(1, 1fr);
      grid-column-gap: interval(2);
      grid-row-gap: interval(2);

      @include mq(sm) {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
      }

      @include mq(md) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
      }
    }

    &__load {
      height: 5rem;
    }

    &:last-child {
      margin-bottom: interval(10);
    }
  }
}
</style>
