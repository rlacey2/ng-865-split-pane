# ng-865-split-pane
A highly robust, nestable split-pane layout component in Angular that allows you to divide views into adjustable side-by-side columns.

Key Features:

• Infinite Nesting Support: Built using Angular template injection (*ngTemplateOutlet) instead of DOM selectors, allowing split-panes to be nested inside one another (e.g., a right-side pane splitting into two more sub-panes) completely independently.

• Isolated Drag Physics: Optimized with NgZone.runOutsideAngular to handle dynamic sizing computations directly on the raw DOM. This avoids Angular change detection lag, prevents layout recalculation feedback loops, and skips common infinite loop call-stack crashes.

• Persistent State Memory: Integrates a localized storage hook (localStorage) managed via structural instance IDs (storageKey), ensuring the user's customized panel widths are remembered across browser refreshes.

• Rigid Flexbox Layout Constraining: Patched with defensive layout CSS rules (min-width: 0 and flex-shrink: 0) to enforce boundaries. Growing a deeply nested internal split pane compresses its neighbor panel locally without overflowing or distorting the outer layout containers.

