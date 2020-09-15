import { Delay } from 'decentraland-ecs-utils/timer/component/delay'

export function delay(ms: number): Promise<undefined> {
  return new Promise((resolve, reject) => {
    const ent = new Entity()
    engine.addEntity(ent)
    ent.addComponent(
      new Delay(ms, () => {
        resolve()
        engine.removeEntity(ent)
      })
    )
  })
}


export function padding(src: string, left = false) {
  const len = src.length
  if (len >= 64) return src
  if (len % 2 != 0) src = '0' + src
  if (len < 64)
    while (src.length < 64) {
      if (left) src += '0'
      else src = '0' + src
    }
  return src
}