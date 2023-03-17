import { readFileSync } from 'fs';
import * as path from 'path';
import { ANTD_CSS_PATH, SYSTEM_PATH } from '@app-fe/global-resources';

const headStr = '<slot data-content="production-slot" />';

const libConfig = JSON.parse(
  readFileSync(path.resolve('./public/libs/libs.config.json'), {
    encoding: 'utf8',
  })
);

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

const createSystemMapContent = () => {
  return `<script type="systemjs-importmap">
  {
    "imports": {
      ${libConfig.packages
    .map(({ name, version, file }, index) => {
      const prefix = index === 0 ? '' : '      ';
      const suffix = index < libConfig.packages.length - 1 ? ',' : '';
      const filePath = `./libs/${name}/${version}/${file}`.replace(
        /\${process\.env\.NODE_ENV}/,
        process.env.NODE_ENV
      );
      return `${prefix}"${name}@${version}": "${filePath}"${suffix}`;
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
    let _html = html;

    const content = [
      createTagContent([...baseSlotTags]),
      createSystemMapContent(),
    ];

    _html = _html.replace(headStr, content.join('\n'));

    return _html;
  },
});
