<template>
  <div class="primary-table">
    <!-- タイトル -->
    <template v-if="table.title">
      <h3 class="primary-table__title" :class="coloring">{{ table.title }}</h3>
    </template>
    <!-- テーブル -->
    <table class="primary-table__table">
      <tbody>
        <tr class="primary-table__record" :class="cellRatio" v-for="body in table.body">
          <th class="primary-table__key">{{ body.key }}</th>
          <td class="primary-table__value">{{ body.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
interface TableBody {
  key: string;
  value: string;
}

interface Table {
  title?: String;
  body: TableBody[];
}

interface Props {
  table: Table;
  ratio?: Number;
  color?: String;
}

const { table, ratio, color } = defineProps<Props>();

// 動的クラス
const cellRatio = computed<string | null>(() => {
  return (ratio) ? `primary-table--${ratio}` : null;
});
const coloring = computed<string | null>(() => {
  return (color) ? `primary-table__title--${color}` : null;
});
</script>

<style ${2|scoped,|} lang="scss">
.primary-table {
  $this: &;
  color: color(darkblue);

  &__title {
    position: relative;
    margin-bottom: interval(1);
    padding-left: interval(3);
    font: bold 1.2rem/1 arial;

    &::before {
      content: '';
      display: block;
      width: interval(2);
      height: 1px;
      background-color: color(darkblue);
      @include position(absolute, $t: 50%, $l: 0);
      transform: translateY(-50%);
    }

    &--white {
      color: color(white);

      &::before {
        background-color: color(white);
      }
    }
  }

  &__table {
    width: 100%;
  }

  &__record {
    font: bold .9rem/1 arial;
    width: 100%;
  }

  &__key,
  &__value {
    font: bold .9rem/1.2 arial;
    letter-spacing: 1.1px;
    padding: interval(1.5) interval(2);
    vertical-align: middle;
  }

  &__key {
    width: 30%;
    background-color: color(lightgray);
    text-align: center;
    border-bottom: 1px solid darken(color(lightgray), 5%);
  }

  &__value {
    width: 70%;
    background-color: color(white);
    white-space: pre-wrap;
    border-bottom: 1px solid color(lightgray);
  }

  @for $i from 1 to 10 {
    #{$this}--#{$i} {
      #{$this}__key {
        width: calc(#{$i} * 10%);
      }
      #{$this}__value {
        width: calc(100% - (#{$i} * 10%));
      }
    }
  }
}
</style>
