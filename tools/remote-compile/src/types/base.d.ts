declare interface PluginCompileConfigModel {
  mode: 'development' | 'production';
  name: string;
  version: string;
  output: string;
  entry: string;
  publicPath?: string;
}

declare type BuilderConfigModel = {
  output: string;
};
