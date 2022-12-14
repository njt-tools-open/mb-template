import {
  ANTD_CSS_PATH,
  ANTD_JS_PATH,
  DAYJS_PATH,
  I18NEXT_JS_PATH,
  REACT_DOM_JS_PATH,
  REACT_I18NEXT_JS_PATH,
  REACT_JS_PATH,
  SYSTEM_PATH,
  SYSTEM_WINDOW_CONNECTOR_PATH,
} from '@app-fe/global-resources';

const headStr = '<slot data-content="production-slot" />';

interface TagModel {
  tag: string;
  attributes: Record<string, string>;
}

/** 基础嵌入标签 */
const baseSlotTags: TagModel[] = [
  {
    tag: 'link',
    attributes: {
      rel: 'stylesheet',
      href: `${ANTD_CSS_PATH}`,
    },
  },
  {
    tag: 'script',
    attributes: {
      src: `${SYSTEM_PATH}`,
    },
  },
];
/** 生产嵌入标签 */
const prodSlotTags: TagModel[] = [
  {
    tag: 'script',
    attributes: {
      src: `./${DAYJS_PATH}`,
    },
  },
  {
    tag: 'script',
    attributes: {
      src: `./${REACT_JS_PATH}`,
    },
  },
  {
    tag: 'script',
    attributes: {
      src: `./${REACT_DOM_JS_PATH}`,
    },
  },
  {
    tag: 'script',
    attributes: {
      src: `./${I18NEXT_JS_PATH}`,
    },
  },
  {
    tag: 'script',
    attributes: {
      src: `./${REACT_I18NEXT_JS_PATH}`,
    },
  },
  {
    tag: 'script',
    attributes: {
      src: `./${ANTD_JS_PATH}`,
    },
  },
];
/** systemjs 模块适配 */
const prodSystemMap = [
  {
    name: 'React',
    src: `./${SYSTEM_WINDOW_CONNECTOR_PATH}?connect=React`,
  },
  {
    name: 'ReactDOM',
    src: `./${SYSTEM_WINDOW_CONNECTOR_PATH}?connect=ReactDOM`,
  },
  {
    name: 'i18next',
    src: `./${SYSTEM_WINDOW_CONNECTOR_PATH}?connect=i18next`,
  },
  {
    name: 'ReactI18next',
    src: `./${SYSTEM_WINDOW_CONNECTOR_PATH}?connect=ReactI18next`,
  },
  {
    name: 'antd',
    src: `./${SYSTEM_WINDOW_CONNECTOR_PATH}?connect=antd`,
  },
];

const createTagContent = (tags: TagModel[]) => {
  return tags
    .map(({ tag, attributes }) => {
      const attr = Reflect.ownKeys(attributes)
        .map(key => {
          return `${key as string}="${attributes[key as string]}"`;
        })
        .join(' ');

      return `<${tag} ${attr}></${tag}>`;
    })
    .join('\n');
};

const createProdSystemMapContent = () => {
  return `<script type="systemjs-importmap">
  {
    "imports": {
      ${prodSystemMap
    .map(({ name, src }, index) => {
      const prefix = index === 0 ? '' : '      ';
      const suffix = index < prodSystemMap.length - 1 ? ',' : '';
      return `${prefix}"${name}": "${src}"${suffix}`;
    })
    .join('\n')}
    }
  }
</script>
  `;
};

export const htmlPlugin = () => ({
  name: 'html-transform',
  transformIndexHtml(html: string) {
    const isDev = process.env.NODE_ENV === 'development';
    let _html = html;

    const content = [
      createTagContent([...baseSlotTags, ...(isDev ? [] : prodSlotTags)]),
    ];
    if (!isDev) {
      content.push(createProdSystemMapContent());
    }

    // const content = [
    //   createTagContent([...baseSlotTags, ...prodSlotTags]),
    //   createProdSystemMapContent(),
    // ];

    _html = _html.replace(headStr, content.join('\n'));

    return _html;
  },
});
