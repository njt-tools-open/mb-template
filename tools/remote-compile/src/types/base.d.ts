declare interface PluginCompileConfigModel {
  mode: 'development' | 'production';
  name: string;
  analyze?: boolean;
  version: string;
  output: string;
  entry: string;
  publicPath?: string;
}

declare type BuilderConfigModel = {
  output: string;
};
