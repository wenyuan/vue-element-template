<template>
  <div v-if="!item.hidden">
    <!-- For user experience design, the sidebar only displays two levels of sub-menus -->
    <!-- The logic here is just a demo, you can design by yourself -->
    <template v-if="hasNoSubMenu(item.children, item)">
      <el-menu-item :index="resolvePath(showingItem.path)">
        <i :class="showingItem.meta.icon"></i>
        <span slot="title">{{ showingItem.meta.title }}</span>
      </el-menu-item>
    </template>
    <template v-if="hasSubMenu(item.children, item)">
      <el-submenu :index="resolvePath(showingItem.path)">
        <template slot="title"><i :class="showingItem.meta.icon"></i>{{ showingItem.meta.title }}</template>
        <el-menu-item
          :key="resolvePath(showingSubItem.path)"
          :index="resolvePath(showingSubItem.path)"
          v-for="showingSubItem in showingSubItems"
        >
          <span slot="title">{{ showingSubItem.meta.title }}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showingItem: null,
      showingSubItems: []
    }
  },
  methods: {
    hasNoSubMenu(children = [], parent) {
      const showingChildren = children.filter(item => {
        return !item.hidden && item.meta
      })

      // Show parent if there are no child router to display (the parent must has meta).
      if (showingChildren.length === 0 && parent.meta) {
        this.showingItem = parent
        return true
      }

      // When there is only one child router, the child router is displayed by default (it must has meta).
      if (showingChildren.length === 1) {
        this.showingItem = showingChildren[0]
        return true
      }

      return false
    },
    hasSubMenu(children = [], parent) {
      const showingChildren = children.filter(item => {
        return !item.hidden && item.meta
      })

      // When there are at least two child routers (all of them must have meta).
      if (showingChildren.length > 1 && parent.meta) {
        this.showingItem = parent
        this.showingSubItems = showingChildren
        return true
      }

      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
