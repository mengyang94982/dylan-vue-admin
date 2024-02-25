/**
 * 公共类型
 */
declare namespace CommonType {
  /**
   * 策略模式
   */
  interface StrategicPattern {
    condition: boolean;
    /**
     * 如果条件为true，则执行回调函数
     */
    callback: () => void;
  }

  type Option<K> = { value: K; label: string };

  type YesOrNo = "Y" | "N";

  type RecordBullable<T> = {
    [K in keyof T]?: T[K] | null;
  };
}
