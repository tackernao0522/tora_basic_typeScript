type Suji = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Dan = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Player = 'first' | 'second'

// 駒の位置を表すクラス
class Position {
  constructor(private suji: Suji, private dan: Dan) {}

  // パラメーターに渡された位置と現在の位置を比較するメソッド
  distanceFrom(position: Position, player: Player) {
    if (player === 'first') {
      return {
        suji: Math.abs(position.suji - this.suji),
        dan: Math.abs(Number(position.dan) - Number(this.dan)),
      }
    } else {
      return {
        suji: Math.abs(position.suji - this.suji),
        dan: -Math.abs(Number(position.dan) - Number(this.dan)), // 段（縦の位置）は正負反転
      }
    }
  }
}

// 駒を表すクラス
abstract class Piece {
  // pieceクラスとサブクラスでアクセスできる
  protected position: Position

  constructor(private readonly player: Player, suji: Suji, dan: Dan) {
    this.position = new Position(suji, dan)
  }

  // メソッドの定義
  // 駒の移動用のメソッド
  moveTo(position: Position) {
    this.position = position
  }

  // 移動できるかどうかを判定するメソッド
  abstract canMoveTo(position: Position, player: Player): boolean
}

class Osho extends Piece {
  // 王将のcanMoveToメソッドを具体的に実装
  canMoveTo(position: Position, player: Player): boolean {
    const distance = this.position.distanceFrom(position, player)
    return distance.suji < 2 && distance.dan < 2
  }
}

class Fu extends Piece {
  canMoveTo(position: Position, player: Player): boolean {
    const distance = this.position.distanceFrom(position, player)
    // 移動先と距離が前方1マスであれば
    return distance.suji === 0 && distance.dan === 1
  }
}

class Narikin extends Fu {
  canMoveTo(position: Position, player: Player): boolean {
    const distance = this.position.distanceFrom(position, player)
    return (
      distance.suji < 2 &&
      distance.dan < 2 && // 移動さきがiマス以内
      distance.suji !== 0 &&
      distance.dan === -1 // 左後方と右後方には進めない
    )
  }
}

class Game {
  private pieces = Game.makePieces()
  private static makePieces() {
    return [
      new Osho('first', 5, '1'),
      new Osho('second', 5, '9'),

      // 先手の歩
      new Fu('first', 1, '3'),
      new Fu('first', 2, '3'),
      new Fu('first', 3, '3'),
      new Fu('first', 4, '3'),
      new Fu('first', 5, '3'),
      new Fu('first', 6, '3'),
      new Fu('first', 7, '3'),
      new Fu('first', 8, '3'),
      new Fu('first', 9, '3'),

      // 後手の歩
      new Fu('second', 1, '7'),
      new Fu('second', 2, '7'),
      new Fu('second', 3, '7'),
      new Fu('second', 4, '7'),
      new Fu('second', 5, '7'),
      new Fu('second', 6, '7'),
      new Fu('second', 7, '7'),
      new Fu('second', 8, '7'),
      new Fu('second', 9, '7'),
    ]
  }
}

new Game()
