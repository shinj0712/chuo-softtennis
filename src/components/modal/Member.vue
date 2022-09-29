<template>
  <modal
    :scroll="true"
    color="white"
    background-color="darkblue"
    close-btn-color="white"
    @close="$emit('close')"
  >
    <article class="member-modal">
      <!-- サムネイル -->
      <div class="member-modal__header" :class="`member-modal__header--${getPositionColor}`">
        <div class="member-modal__thumbnail">
          <image-thumbnail :img="member.img" :color="getPositionColor"/>
        </div>
      </div>
      <!-- 名前 -->
      <h2 class="member-modal__name">
        {{ member.name_ja }}
        <span class="member-modal__name-en">
          {{ member.name_en }}
        </span>
      </h2>
      <!-- プロフィール -->
      <div class="member-modal__profile">
        <table-primary :table="getProfile" :ratio="4"/>
      </div>

      <ul class="member-modal__tags">
        <li class="member-modal__tag" v-for="tag in member.tags">
          <tag :text="tag" size="md"/>
        </li>
      </ul>
    </article>
  </modal>
</template>

<script lang="ts" setup>
import { Member } from "@/types/members";
import { Table } from "@/types/utility";

interface Props {
  member: Member;
}
interface Emits {
  (e: 'close'): void;
}

const { member } = defineProps<Props>();
const emit = defineEmits<Emits>();

console.log(member);

// custom class
const getPositionColor = computed<string>(() => (member.position?.color) ? member.position.color : 'blue');

/**
 * profile data
 *
 * @return {Table} profile table data
 */
const getProfile = computed<Table>(() => {
  const title: string = 'PROFILE';
  const profileMap = [];
  if (member.position?.name_ja)  profileMap.push({ key: 'ポジション', value: member.position?.name_ja });
  if (member.affiliation)        profileMap.push({ key: '所属', value: member.affiliation });
  if (member.grade)              profileMap.push({ key: '学年', value: `${member.grade}年生` });
  if (member.from)               profileMap.push({ key: '出身', value: member.from });
  if (member.alma_mater)         profileMap.push({ key: '出身校', value: member.alma_mater });
  if (member.graduation_year)    profileMap.push({ key: '卒業年', value: `${member.graduation_year}年` });
  return {
    title: title,
    body: profileMap,
  };
});
</script>

<style ${2|scoped,|} lang="scss">
.member-modal {
  $this: &;
  color: color(darkblue);
  background-color: color(white);
  padding: interval(2);
  margin: interval(2);

  // tablet
  @include mq(sm) {
    padding: interval(3);
    margin: interval(5);

    #{$this}__header {
      margin-right: - interval(3);
      margin-left: - interval(3);
    }
  }

  // pc
  @include mq(md) {
    padding: interval(5);
    margin: interval(8);

    #{$this}__header {
      margin-right: - interval(5);
      margin-left: - interval(5);
    }
  }

  &__header {
    position: relative;
    display: grid;
    place-items: center;
    margin-right: - interval(2);
    margin-left: - interval(2);

    &--blue {
      &::before {
        @include gradient(color(navy), color(blue), diagonal);
      }
      &::after {
        @include gradient(color(blue), color(navy), diagonal);
      }
    }

    &--orange {
      &::before {
        @include gradient(color(navy), color(orange), diagonal);
      }
      &::after {
        @include gradient(color(orange), color(navy), diagonal);
      }
    }

    &--lightgreen {
      &::before {
        @include gradient(color(navy), color(lightgreen), diagonal);
      }
      &::after {
        @include gradient(color(lightgreen), color(navy), diagonal);
      }
    }

    &::before,
    &::after {
      display: block;
      content: '';
      height: 3rem;
    }

    &::before {
      width: 50%;
      @include position(absolute, $t: 1.5rem, $l: 0, $z: z-index(none));
    }

    &::after {
      width: 45%;
      @include position(absolute, $b: 1.5rem, $r: 5%, $z: z-index(none));
      border-radius: 0 1000px 1000px 0;
    }
  }


  &__thumbnail {
    width: 15rem;
    @include position(relative, $z: z-index(over));
  }

  &__name {
    margin-top: interval(2);
    font: bold 2rem/1.5 arial;
    text-align: center;

    &-en {
      display: block;
      font: normal 1.5rem/1 bangers;
      letter-spacing: 2px;
    }
  }

  &__profile {
    margin-top: interval(5);
  }

  &__tags {
    margin-top: interval(5);
    @include flex(row wrap, flex-start, stretch, interval(1));
  }
}
</style>
