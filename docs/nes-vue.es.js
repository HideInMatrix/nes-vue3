var Ii = Object.defineProperty;
var Ni = (a, h, s) =>
  h in a
    ? Ii(a, h, { enumerable: !0, configurable: !0, writable: !0, value: s })
    : (a[h] = s);
var x = (a, h, s) => Ni(a, typeof h != "symbol" ? h + "" : h, s);
import {
  computed as J,
  watch as H,
  onMounted as ti,
  onBeforeUnmount as ii,
  ref as ei,
  defineComponent as Ei,
  effect as Ti,
  nextTick as Oi,
  openBlock as Ot,
  createElementBlock as Ft,
  normalizeStyle as Fi,
  createElementVNode as Mt,
  unref as yt,
  withDirectives as Mi,
  vShow as yi,
  toDisplayString as Pi,
  createCommentVNode as vi,
} from "vue";
class ki {
  /**
   * 这是 IndexedDB 数据库的构造函数，用于创建对象存储。
   * @param dbName - 将创建或访问的 IndexedDB 数据库的名称。
   * @param storeName - 将在 IndexedDB 数据库中创建或访问的存储对象的名称。
   * @param version - 存储对象的版本。
   * @returns DB类的实例
   */
  constructor(h, s, t) {
    x(this, "_dataFactory", window.indexedDB);
    x(this, "_dbName");
    x(this, "_storeName");
    x(this, "_database");
    x(this, "_res");
    (this._dataFactory = window.indexedDB),
      (this._dbName = h),
      (this._storeName = s),
      (this._res = this._dataFactory.open(this._dbName, t)),
      this._res.addEventListener("success", () => {
        (this._database = this._res.result),
          this._database.objectStoreNames.contains(this._storeName) ||
            this._database.createObjectStore(this._storeName, {
              keyPath: "id",
            });
      }),
      this._res.addEventListener("error", () => {
        console.error("indexedDB load error");
      }),
      this._res.addEventListener("upgradeneeded", () => {
        (this._database = this._res.result),
          this._database.objectStoreNames.contains(this._storeName) ||
            this._database.createObjectStore(this._storeName, {
              keyPath: "id",
            });
      });
  }
  get _store() {
    return this._database
      .transaction([this._storeName], "readwrite")
      .objectStore(this._storeName);
  }
  /**
   * 将对象存储中的数据写入 IndexedDB 数据库。
   * @param id - 数据的唯一标识。
   * @param data - 数据。
   */
  set_item(h, s) {
    this._store.put({ id: h, data: s });
  }
  /**
   * 从对象存储中读取数据。
   * @param id - 数据的唯一标识。
   * @returns 数据，它是一个Promise。
   *
   */
  get_item(h) {
    const s = this._store.get(h);
    return new Promise((t, o) => {
      s.addEventListener("success", () => {
        t(s.result.data);
      }),
        s.addEventListener("error", o);
    });
  }
  /**
   * 从对象存储中删除数据。
   * @param id - 数据的唯一标识。
   */
  remove_item(h) {
    this._store.delete(h);
  }
  /**
   * 清空对象存储中的所有数据。
   */
  clear() {
    this._store.clear();
  }
}
function Li(a, h) {
  return new ki(a, h);
}
function gt(a, h, s) {
  return h > s && ([h, s] = [s, h]), Math.min(s, Math.max(h, a));
}
function U(a) {
  return Array(a).fill(!1);
}
function wi(a) {
  return a.filter(Boolean);
}
function Bi() {
  return D(32768, 0).map((a, h) => h);
}
function B(a) {
  const h = [];
  let s = a[0],
    t = 1;
  for (let o = 1; o < a.length; o++)
    a[o] === s
      ? t++
      : (t > 1 ? (h.push(t), h.push(s)) : h.push(-s - 1), (s = a[o]), (t = 1));
  return h.push(t), h.push(s), h;
}
function V(a) {
  const h = [];
  for (let s = 0; s < a.length; )
    if (a[s] < 0) h.push(-a[s] - 1), s++;
    else {
      const t = a[s],
        o = a[s + 1];
      for (let e = 0; e < t; e++) h.push(o);
      s += 2;
    }
  return h;
}
function Vi(a) {
  const h = [],
    s = [];
  for (let t = 0; t < a.length; t++) {
    for (let o = 0; o < a[t].opaque.length; o++)
      a[t].opaque[o] === !1 ? h.push(0) : h.push(1);
    s.push(...a[t].pix);
  }
  return [B(h), B(s)];
}
function Gi(a) {
  const h = [];
  let s = Array(8),
    t = [];
  const o = V(a[0]),
    e = V(a[1]);
  for (let i = 0; i < 512; i += 1) {
    for (let r = 0; r < 8; r += 1) o[i * 8 + r] === 0 && (s[r] = !1);
    for (let r = 0; r < 64; r += 1) t[r] = e[i * 64 + r];
    h.push({
      opaque: s,
      pix: t,
    }),
      (s = Array(8)),
      (t = []);
  }
  return h;
}
function qi(a) {
  const h = [],
    s = [];
  return (
    a.reduce((t, o) => (h.push(...o.tile), s.push(...o.attrib), t), h),
    [B(h), B(s)]
  );
}
function Xi(a) {
  const h = [];
  let s = [],
    t = [];
  const o = V(a[0]),
    e = V(a[1]);
  for (let i = 0; i < 1024 * 4; i += 1)
    s.push(o[i]),
      t.push(e[i]),
      (i + 1) % 1024 === 0 &&
        (h.push({ tile: s, attrib: t }), (s = []), (t = []));
  return h;
}
function Z(a) {
  return +`0x${a}`;
}
function D(a, h) {
  return Array.from({ length: a }).fill(h);
}
function rt(a) {
  return Object.entries(a);
}
function Yi(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default")
    ? a.default
    : a;
}
var nt, Pt;
function si() {
  if (Pt) return nt;
  Pt = 1;
  var a = function () {
    this.state = new Array(8);
    for (var h = 0; h < this.state.length; h++) this.state[h] = 64;
  };
  return (
    (a.BUTTON_A = 0),
    (a.BUTTON_B = 1),
    (a.BUTTON_SELECT = 2),
    (a.BUTTON_START = 3),
    (a.BUTTON_UP = 4),
    (a.BUTTON_DOWN = 5),
    (a.BUTTON_LEFT = 6),
    (a.BUTTON_RIGHT = 7),
    (a.prototype = {
      buttonDown: function (h) {
        this.state[h] = 65;
      },
      buttonUp: function (h) {
        this.state[h] = 64;
      },
    }),
    (nt = a),
    nt
  );
}
var at, vt;
function At() {
  return (
    vt ||
      ((vt = 1),
      (at = {
        copyArrayElements: function (a, h, s, t, o) {
          for (var e = 0; e < o; ++e) s[t + e] = a[h + e];
        },
        copyArray: function (a) {
          return a.slice(0);
        },
        fromJSON: function (a, h) {
          for (var s = 0; s < a.JSON_PROPERTIES.length; s++)
            a[a.JSON_PROPERTIES[s]] = h[a.JSON_PROPERTIES[s]];
        },
        toJSON: function (a) {
          for (var h = {}, s = 0; s < a.JSON_PROPERTIES.length; s++)
            h[a.JSON_PROPERTIES[s]] = a[a.JSON_PROPERTIES[s]];
          return h;
        },
      })),
    at
  );
}
var ot, kt;
function Hi() {
  if (kt) return ot;
  kt = 1;
  var a = At(),
    h = function (t) {
      (this.nes = t),
        (this.mem = null),
        (this.REG_ACC = null),
        (this.REG_X = null),
        (this.REG_Y = null),
        (this.REG_SP = null),
        (this.REG_PC = null),
        (this.REG_PC_NEW = null),
        (this.REG_STATUS = null),
        (this.F_CARRY = null),
        (this.F_DECIMAL = null),
        (this.F_INTERRUPT = null),
        (this.F_INTERRUPT_NEW = null),
        (this.F_OVERFLOW = null),
        (this.F_SIGN = null),
        (this.F_ZERO = null),
        (this.F_NOTUSED = null),
        (this.F_NOTUSED_NEW = null),
        (this.F_BRK = null),
        (this.F_BRK_NEW = null),
        (this.opdata = null),
        (this.cyclesToHalt = null),
        (this.crash = null),
        (this.irqRequested = null),
        (this.irqType = null),
        this.reset();
    };
  h.prototype = {
    // IRQ Types
    IRQ_NORMAL: 0,
    IRQ_NMI: 1,
    IRQ_RESET: 2,
    reset: function () {
      this.mem = new Array(65536);
      for (var t = 0; t < 8192; t++) this.mem[t] = 255;
      for (var o = 0; o < 4; o++) {
        var e = o * 2048;
        (this.mem[e + 8] = 247),
          (this.mem[e + 9] = 239),
          (this.mem[e + 10] = 223),
          (this.mem[e + 15] = 191);
      }
      for (var i = 8193; i < this.mem.length; i++) this.mem[i] = 0;
      (this.REG_ACC = 0),
        (this.REG_X = 0),
        (this.REG_Y = 0),
        (this.REG_SP = 511),
        (this.REG_PC = 32767),
        (this.REG_PC_NEW = 32767),
        (this.REG_STATUS = 40),
        this.setStatus(40),
        (this.F_CARRY = 0),
        (this.F_DECIMAL = 0),
        (this.F_INTERRUPT = 1),
        (this.F_INTERRUPT_NEW = 1),
        (this.F_OVERFLOW = 0),
        (this.F_SIGN = 0),
        (this.F_ZERO = 1),
        (this.F_NOTUSED = 1),
        (this.F_NOTUSED_NEW = 1),
        (this.F_BRK = 1),
        (this.F_BRK_NEW = 1),
        (this.opdata = new s().opdata),
        (this.cyclesToHalt = 0),
        (this.crash = !1),
        (this.irqRequested = !1),
        (this.irqType = null);
    },
    // Emulates a single CPU instruction, returns the number of cycles
    emulate: function () {
      var t, o;
      if (this.irqRequested) {
        switch (
          ((t =
            this.F_CARRY |
            ((this.F_ZERO === 0 ? 1 : 0) << 1) |
            (this.F_INTERRUPT << 2) |
            (this.F_DECIMAL << 3) |
            (this.F_BRK << 4) |
            (this.F_NOTUSED << 5) |
            (this.F_OVERFLOW << 6) |
            (this.F_SIGN << 7)),
          (this.REG_PC_NEW = this.REG_PC),
          (this.F_INTERRUPT_NEW = this.F_INTERRUPT),
          this.irqType)
        ) {
          case 0: {
            if (this.F_INTERRUPT !== 0) break;
            this.doIrq(t);
            break;
          }
          case 1: {
            this.doNonMaskableInterrupt(t);
            break;
          }
          case 2: {
            this.doResetInterrupt();
            break;
          }
        }
        (this.REG_PC = this.REG_PC_NEW),
          (this.F_INTERRUPT = this.F_INTERRUPT_NEW),
          (this.F_BRK = this.F_BRK_NEW),
          (this.irqRequested = !1);
      }
      var e = this.opdata[this.nes.mmap.load(this.REG_PC + 1)],
        i = e >> 24,
        r = 0,
        n = (e >> 8) & 255,
        u = this.REG_PC;
      this.REG_PC += (e >> 16) & 255;
      var l = 0;
      switch (n) {
        case 0: {
          l = this.load(u + 2);
          break;
        }
        case 1: {
          (l = this.load(u + 2)),
            l < 128 ? (l += this.REG_PC) : (l += this.REG_PC - 256);
          break;
        }
        case 2:
          break;
        case 3: {
          l = this.load16bit(u + 2);
          break;
        }
        case 4: {
          l = this.REG_ACC;
          break;
        }
        case 5: {
          l = this.REG_PC;
          break;
        }
        case 6: {
          l = (this.load(u + 2) + this.REG_X) & 255;
          break;
        }
        case 7: {
          l = (this.load(u + 2) + this.REG_Y) & 255;
          break;
        }
        case 8: {
          (l = this.load16bit(u + 2)),
            (l & 65280) !== ((l + this.REG_X) & 65280) && (r = 1),
            (l += this.REG_X);
          break;
        }
        case 9: {
          (l = this.load16bit(u + 2)),
            (l & 65280) !== ((l + this.REG_Y) & 65280) && (r = 1),
            (l += this.REG_Y);
          break;
        }
        case 10: {
          (l = this.load(u + 2)),
            (l & 65280) !== ((l + this.REG_X) & 65280) && (r = 1),
            (l += this.REG_X),
            (l &= 255),
            (l = this.load16bit(l));
          break;
        }
        case 11: {
          (l = this.load16bit(this.load(u + 2))),
            (l & 65280) !== ((l + this.REG_Y) & 65280) && (r = 1),
            (l += this.REG_Y);
          break;
        }
        case 12: {
          (l = this.load16bit(u + 2)),
            l < 8191
              ? (l =
                  this.mem[l] +
                  (this.mem[(l & 65280) | (((l & 255) + 1) & 255)] << 8))
              : (l =
                  this.nes.mmap.load(l) +
                  (this.nes.mmap.load((l & 65280) | (((l & 255) + 1) & 255)) <<
                    8));
          break;
        }
      }
      switch (((l &= 65535), e & 255)) {
        case 0: {
          (t = this.REG_ACC + this.load(l) + this.F_CARRY),
            !((this.REG_ACC ^ this.load(l)) & 128) && (this.REG_ACC ^ t) & 128
              ? (this.F_OVERFLOW = 1)
              : (this.F_OVERFLOW = 0),
            (this.F_CARRY = t > 255 ? 1 : 0),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t & 255),
            (this.REG_ACC = t & 255),
            (i += r);
          break;
        }
        case 1: {
          (this.REG_ACC = this.REG_ACC & this.load(l)),
            (this.F_SIGN = (this.REG_ACC >> 7) & 1),
            (this.F_ZERO = this.REG_ACC),
            n !== 11 && (i += r);
          break;
        }
        case 2: {
          n === 4
            ? ((this.F_CARRY = (this.REG_ACC >> 7) & 1),
              (this.REG_ACC = (this.REG_ACC << 1) & 255),
              (this.F_SIGN = (this.REG_ACC >> 7) & 1),
              (this.F_ZERO = this.REG_ACC))
            : ((t = this.load(l)),
              (this.F_CARRY = (t >> 7) & 1),
              (t = (t << 1) & 255),
              (this.F_SIGN = (t >> 7) & 1),
              (this.F_ZERO = t),
              this.write(l, t));
          break;
        }
        case 3: {
          this.F_CARRY === 0 &&
            ((i += (u & 65280) !== (l & 65280) ? 2 : 1), (this.REG_PC = l));
          break;
        }
        case 4: {
          this.F_CARRY === 1 &&
            ((i += (u & 65280) !== (l & 65280) ? 2 : 1), (this.REG_PC = l));
          break;
        }
        case 5: {
          this.F_ZERO === 0 &&
            ((i += (u & 65280) !== (l & 65280) ? 2 : 1), (this.REG_PC = l));
          break;
        }
        case 6: {
          (t = this.load(l)),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_OVERFLOW = (t >> 6) & 1),
            (t &= this.REG_ACC),
            (this.F_ZERO = t);
          break;
        }
        case 7: {
          this.F_SIGN === 1 && (i++, (this.REG_PC = l));
          break;
        }
        case 8: {
          this.F_ZERO !== 0 &&
            ((i += (u & 65280) !== (l & 65280) ? 2 : 1), (this.REG_PC = l));
          break;
        }
        case 9: {
          this.F_SIGN === 0 &&
            ((i += (u & 65280) !== (l & 65280) ? 2 : 1), (this.REG_PC = l));
          break;
        }
        case 10: {
          (this.REG_PC += 2),
            this.push((this.REG_PC >> 8) & 255),
            this.push(this.REG_PC & 255),
            (this.F_BRK = 1),
            this.push(
              this.F_CARRY |
                ((this.F_ZERO === 0 ? 1 : 0) << 1) |
                (this.F_INTERRUPT << 2) |
                (this.F_DECIMAL << 3) |
                (this.F_BRK << 4) |
                (this.F_NOTUSED << 5) |
                (this.F_OVERFLOW << 6) |
                (this.F_SIGN << 7)
            ),
            (this.F_INTERRUPT = 1),
            (this.REG_PC = this.load16bit(65534)),
            this.REG_PC--;
          break;
        }
        case 11: {
          this.F_OVERFLOW === 0 &&
            ((i += (u & 65280) !== (l & 65280) ? 2 : 1), (this.REG_PC = l));
          break;
        }
        case 12: {
          this.F_OVERFLOW === 1 &&
            ((i += (u & 65280) !== (l & 65280) ? 2 : 1), (this.REG_PC = l));
          break;
        }
        case 13: {
          this.F_CARRY = 0;
          break;
        }
        case 14: {
          this.F_DECIMAL = 0;
          break;
        }
        case 15: {
          this.F_INTERRUPT = 0;
          break;
        }
        case 16: {
          this.F_OVERFLOW = 0;
          break;
        }
        case 17: {
          (t = this.REG_ACC - this.load(l)),
            (this.F_CARRY = t >= 0 ? 1 : 0),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t & 255),
            (i += r);
          break;
        }
        case 18: {
          (t = this.REG_X - this.load(l)),
            (this.F_CARRY = t >= 0 ? 1 : 0),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t & 255);
          break;
        }
        case 19: {
          (t = this.REG_Y - this.load(l)),
            (this.F_CARRY = t >= 0 ? 1 : 0),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t & 255);
          break;
        }
        case 20: {
          (t = (this.load(l) - 1) & 255),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t),
            this.write(l, t);
          break;
        }
        case 21: {
          (this.REG_X = (this.REG_X - 1) & 255),
            (this.F_SIGN = (this.REG_X >> 7) & 1),
            (this.F_ZERO = this.REG_X);
          break;
        }
        case 22: {
          (this.REG_Y = (this.REG_Y - 1) & 255),
            (this.F_SIGN = (this.REG_Y >> 7) & 1),
            (this.F_ZERO = this.REG_Y);
          break;
        }
        case 23: {
          (this.REG_ACC = (this.load(l) ^ this.REG_ACC) & 255),
            (this.F_SIGN = (this.REG_ACC >> 7) & 1),
            (this.F_ZERO = this.REG_ACC),
            (i += r);
          break;
        }
        case 24: {
          (t = (this.load(l) + 1) & 255),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t),
            this.write(l, t & 255);
          break;
        }
        case 25: {
          (this.REG_X = (this.REG_X + 1) & 255),
            (this.F_SIGN = (this.REG_X >> 7) & 1),
            (this.F_ZERO = this.REG_X);
          break;
        }
        case 26: {
          this.REG_Y++,
            (this.REG_Y &= 255),
            (this.F_SIGN = (this.REG_Y >> 7) & 1),
            (this.F_ZERO = this.REG_Y);
          break;
        }
        case 27: {
          this.REG_PC = l - 1;
          break;
        }
        case 28: {
          this.push((this.REG_PC >> 8) & 255),
            this.push(this.REG_PC & 255),
            (this.REG_PC = l - 1);
          break;
        }
        case 29: {
          (this.REG_ACC = this.load(l)),
            (this.F_SIGN = (this.REG_ACC >> 7) & 1),
            (this.F_ZERO = this.REG_ACC),
            (i += r);
          break;
        }
        case 30: {
          (this.REG_X = this.load(l)),
            (this.F_SIGN = (this.REG_X >> 7) & 1),
            (this.F_ZERO = this.REG_X),
            (i += r);
          break;
        }
        case 31: {
          (this.REG_Y = this.load(l)),
            (this.F_SIGN = (this.REG_Y >> 7) & 1),
            (this.F_ZERO = this.REG_Y),
            (i += r);
          break;
        }
        case 32: {
          n === 4
            ? ((t = this.REG_ACC & 255),
              (this.F_CARRY = t & 1),
              (t >>= 1),
              (this.REG_ACC = t))
            : ((t = this.load(l) & 255),
              (this.F_CARRY = t & 1),
              (t >>= 1),
              this.write(l, t)),
            (this.F_SIGN = 0),
            (this.F_ZERO = t);
          break;
        }
        case 33:
          break;
        case 34: {
          (t = (this.load(l) | this.REG_ACC) & 255),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t),
            (this.REG_ACC = t),
            n !== 11 && (i += r);
          break;
        }
        case 35: {
          this.push(this.REG_ACC);
          break;
        }
        case 36: {
          (this.F_BRK = 1),
            this.push(
              this.F_CARRY |
                ((this.F_ZERO === 0 ? 1 : 0) << 1) |
                (this.F_INTERRUPT << 2) |
                (this.F_DECIMAL << 3) |
                (this.F_BRK << 4) |
                (this.F_NOTUSED << 5) |
                (this.F_OVERFLOW << 6) |
                (this.F_SIGN << 7)
            );
          break;
        }
        case 37: {
          (this.REG_ACC = this.pull()),
            (this.F_SIGN = (this.REG_ACC >> 7) & 1),
            (this.F_ZERO = this.REG_ACC);
          break;
        }
        case 38: {
          (t = this.pull()),
            (this.F_CARRY = t & 1),
            (this.F_ZERO = ((t >> 1) & 1) === 1 ? 0 : 1),
            (this.F_INTERRUPT = (t >> 2) & 1),
            (this.F_DECIMAL = (t >> 3) & 1),
            (this.F_BRK = (t >> 4) & 1),
            (this.F_NOTUSED = (t >> 5) & 1),
            (this.F_OVERFLOW = (t >> 6) & 1),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_NOTUSED = 1);
          break;
        }
        case 39: {
          n === 4
            ? ((t = this.REG_ACC),
              (o = this.F_CARRY),
              (this.F_CARRY = (t >> 7) & 1),
              (t = ((t << 1) & 255) + o),
              (this.REG_ACC = t))
            : ((t = this.load(l)),
              (o = this.F_CARRY),
              (this.F_CARRY = (t >> 7) & 1),
              (t = ((t << 1) & 255) + o),
              this.write(l, t)),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t);
          break;
        }
        case 40: {
          n === 4
            ? ((o = this.F_CARRY << 7),
              (this.F_CARRY = this.REG_ACC & 1),
              (t = (this.REG_ACC >> 1) + o),
              (this.REG_ACC = t))
            : ((t = this.load(l)),
              (o = this.F_CARRY << 7),
              (this.F_CARRY = t & 1),
              (t = (t >> 1) + o),
              this.write(l, t)),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t);
          break;
        }
        case 41: {
          if (
            ((t = this.pull()),
            (this.F_CARRY = t & 1),
            (this.F_ZERO = (t >> 1) & 1 ? 0 : 1),
            (this.F_INTERRUPT = (t >> 2) & 1),
            (this.F_DECIMAL = (t >> 3) & 1),
            (this.F_BRK = (t >> 4) & 1),
            (this.F_NOTUSED = (t >> 5) & 1),
            (this.F_OVERFLOW = (t >> 6) & 1),
            (this.F_SIGN = (t >> 7) & 1),
            (this.REG_PC = this.pull()),
            (this.REG_PC += this.pull() << 8),
            this.REG_PC === 65535)
          )
            return;
          this.REG_PC--, (this.F_NOTUSED = 1);
          break;
        }
        case 42: {
          if (
            ((this.REG_PC = this.pull()),
            (this.REG_PC += this.pull() << 8),
            this.REG_PC === 65535)
          )
            return;
          break;
        }
        case 43: {
          (t = this.REG_ACC - this.load(l) - (1 - this.F_CARRY)),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t & 255),
            (this.REG_ACC ^ t) & 128 && (this.REG_ACC ^ this.load(l)) & 128
              ? (this.F_OVERFLOW = 1)
              : (this.F_OVERFLOW = 0),
            (this.F_CARRY = t < 0 ? 0 : 1),
            (this.REG_ACC = t & 255),
            n !== 11 && (i += r);
          break;
        }
        case 44: {
          this.F_CARRY = 1;
          break;
        }
        case 45: {
          this.F_DECIMAL = 1;
          break;
        }
        case 46: {
          this.F_INTERRUPT = 1;
          break;
        }
        case 47: {
          this.write(l, this.REG_ACC);
          break;
        }
        case 48: {
          this.write(l, this.REG_X);
          break;
        }
        case 49: {
          this.write(l, this.REG_Y);
          break;
        }
        case 50: {
          (this.REG_X = this.REG_ACC),
            (this.F_SIGN = (this.REG_ACC >> 7) & 1),
            (this.F_ZERO = this.REG_ACC);
          break;
        }
        case 51: {
          (this.REG_Y = this.REG_ACC),
            (this.F_SIGN = (this.REG_ACC >> 7) & 1),
            (this.F_ZERO = this.REG_ACC);
          break;
        }
        case 52: {
          (this.REG_X = this.REG_SP - 256),
            (this.F_SIGN = (this.REG_SP >> 7) & 1),
            (this.F_ZERO = this.REG_X);
          break;
        }
        case 53: {
          (this.REG_ACC = this.REG_X),
            (this.F_SIGN = (this.REG_X >> 7) & 1),
            (this.F_ZERO = this.REG_X);
          break;
        }
        case 54: {
          (this.REG_SP = this.REG_X + 256), this.stackWrap();
          break;
        }
        case 55: {
          (this.REG_ACC = this.REG_Y),
            (this.F_SIGN = (this.REG_Y >> 7) & 1),
            (this.F_ZERO = this.REG_Y);
          break;
        }
        case 56: {
          (t = this.REG_ACC & this.load(l)),
            (this.F_CARRY = t & 1),
            (this.REG_ACC = this.F_ZERO = t >> 1),
            (this.F_SIGN = 0);
          break;
        }
        case 57: {
          (this.REG_ACC = this.F_ZERO = this.REG_ACC & this.load(l)),
            (this.F_CARRY = this.F_SIGN = (this.REG_ACC >> 7) & 1);
          break;
        }
        case 58: {
          (t = this.REG_ACC & this.load(l)),
            (this.REG_ACC = this.F_ZERO = (t >> 1) + (this.F_CARRY << 7)),
            (this.F_SIGN = this.F_CARRY),
            (this.F_CARRY = (t >> 7) & 1),
            (this.F_OVERFLOW = ((t >> 7) ^ (t >> 6)) & 1);
          break;
        }
        case 59: {
          (t = (this.REG_X & this.REG_ACC) - this.load(l)),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t & 255),
            (this.REG_X ^ t) & 128 && (this.REG_X ^ this.load(l)) & 128
              ? (this.F_OVERFLOW = 1)
              : (this.F_OVERFLOW = 0),
            (this.F_CARRY = t < 0 ? 0 : 1),
            (this.REG_X = t & 255);
          break;
        }
        case 60: {
          (this.REG_ACC = this.REG_X = this.F_ZERO = this.load(l)),
            (this.F_SIGN = (this.REG_ACC >> 7) & 1),
            (i += r);
          break;
        }
        case 61: {
          this.write(l, this.REG_ACC & this.REG_X);
          break;
        }
        case 62: {
          (t = (this.load(l) - 1) & 255),
            this.write(l, t),
            (t = this.REG_ACC - t),
            (this.F_CARRY = t >= 0 ? 1 : 0),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t & 255),
            n !== 11 && (i += r);
          break;
        }
        case 63: {
          (t = (this.load(l) + 1) & 255),
            this.write(l, t),
            (t = this.REG_ACC - t - (1 - this.F_CARRY)),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t & 255),
            (this.REG_ACC ^ t) & 128 && (this.REG_ACC ^ this.load(l)) & 128
              ? (this.F_OVERFLOW = 1)
              : (this.F_OVERFLOW = 0),
            (this.F_CARRY = t < 0 ? 0 : 1),
            (this.REG_ACC = t & 255),
            n !== 11 && (i += r);
          break;
        }
        case 64: {
          (t = this.load(l)),
            (o = this.F_CARRY),
            (this.F_CARRY = (t >> 7) & 1),
            (t = ((t << 1) & 255) + o),
            this.write(l, t),
            (this.REG_ACC = this.REG_ACC & t),
            (this.F_SIGN = (this.REG_ACC >> 7) & 1),
            (this.F_ZERO = this.REG_ACC),
            n !== 11 && (i += r);
          break;
        }
        case 65: {
          (t = this.load(l)),
            (o = this.F_CARRY << 7),
            (this.F_CARRY = t & 1),
            (t = (t >> 1) + o),
            this.write(l, t),
            (t = this.REG_ACC + this.load(l) + this.F_CARRY),
            !((this.REG_ACC ^ this.load(l)) & 128) && (this.REG_ACC ^ t) & 128
              ? (this.F_OVERFLOW = 1)
              : (this.F_OVERFLOW = 0),
            (this.F_CARRY = t > 255 ? 1 : 0),
            (this.F_SIGN = (t >> 7) & 1),
            (this.F_ZERO = t & 255),
            (this.REG_ACC = t & 255),
            n !== 11 && (i += r);
          break;
        }
        case 66: {
          (t = this.load(l)),
            (this.F_CARRY = (t >> 7) & 1),
            (t = (t << 1) & 255),
            this.write(l, t),
            (this.REG_ACC = this.REG_ACC | t),
            (this.F_SIGN = (this.REG_ACC >> 7) & 1),
            (this.F_ZERO = this.REG_ACC),
            n !== 11 && (i += r);
          break;
        }
        case 67: {
          (t = this.load(l) & 255),
            (this.F_CARRY = t & 1),
            (t >>= 1),
            this.write(l, t),
            (this.REG_ACC = this.REG_ACC ^ t),
            (this.F_SIGN = (this.REG_ACC >> 7) & 1),
            (this.F_ZERO = this.REG_ACC),
            n !== 11 && (i += r);
          break;
        }
        case 68:
          break;
        case 69: {
          this.load(l), n !== 11 && (i += r);
          break;
        }
        default: {
          this.nes.stop(),
            (this.nes.crashMessage =
              "Game crashed, invalid opcode at address $" + u.toString(16));
          break;
        }
      }
      return i;
    },
    load: function (t) {
      return t < 8192 ? this.mem[t & 2047] : this.nes.mmap.load(t);
    },
    load16bit: function (t) {
      return t < 8191
        ? this.mem[t & 2047] | (this.mem[(t + 1) & 2047] << 8)
        : this.nes.mmap.load(t) | (this.nes.mmap.load(t + 1) << 8);
    },
    write: function (t, o) {
      t < 8192 ? (this.mem[t & 2047] = o) : this.nes.mmap.write(t, o);
    },
    requestIrq: function (t) {
      (this.irqRequested && t === this.IRQ_NORMAL) ||
        ((this.irqRequested = !0), (this.irqType = t));
    },
    push: function (t) {
      this.nes.mmap.write(this.REG_SP, t),
        this.REG_SP--,
        (this.REG_SP = 256 | (this.REG_SP & 255));
    },
    stackWrap: function () {
      this.REG_SP = 256 | (this.REG_SP & 255);
    },
    pull: function () {
      return (
        this.REG_SP++,
        (this.REG_SP = 256 | (this.REG_SP & 255)),
        this.nes.mmap.load(this.REG_SP)
      );
    },
    pageCrossed: function (t, o) {
      return (t & 65280) !== (o & 65280);
    },
    haltCycles: function (t) {
      this.cyclesToHalt += t;
    },
    doNonMaskableInterrupt: function (t) {
      this.nes.mmap.load(8192) & 128 &&
        (this.REG_PC_NEW++,
        this.push((this.REG_PC_NEW >> 8) & 255),
        this.push(this.REG_PC_NEW & 255),
        this.push(t),
        (this.REG_PC_NEW =
          this.nes.mmap.load(65530) | (this.nes.mmap.load(65531) << 8)),
        this.REG_PC_NEW--);
    },
    doResetInterrupt: function () {
      (this.REG_PC_NEW =
        this.nes.mmap.load(65532) | (this.nes.mmap.load(65533) << 8)),
        this.REG_PC_NEW--;
    },
    doIrq: function (t) {
      this.REG_PC_NEW++,
        this.push((this.REG_PC_NEW >> 8) & 255),
        this.push(this.REG_PC_NEW & 255),
        this.push(t),
        (this.F_INTERRUPT_NEW = 1),
        (this.F_BRK_NEW = 0),
        (this.REG_PC_NEW =
          this.nes.mmap.load(65534) | (this.nes.mmap.load(65535) << 8)),
        this.REG_PC_NEW--;
    },
    getStatus: function () {
      return (
        this.F_CARRY |
        (this.F_ZERO << 1) |
        (this.F_INTERRUPT << 2) |
        (this.F_DECIMAL << 3) |
        (this.F_BRK << 4) |
        (this.F_NOTUSED << 5) |
        (this.F_OVERFLOW << 6) |
        (this.F_SIGN << 7)
      );
    },
    setStatus: function (t) {
      (this.F_CARRY = t & 1),
        (this.F_ZERO = (t >> 1) & 1),
        (this.F_INTERRUPT = (t >> 2) & 1),
        (this.F_DECIMAL = (t >> 3) & 1),
        (this.F_BRK = (t >> 4) & 1),
        (this.F_NOTUSED = (t >> 5) & 1),
        (this.F_OVERFLOW = (t >> 6) & 1),
        (this.F_SIGN = (t >> 7) & 1);
    },
    JSON_PROPERTIES: [
      "mem",
      "cyclesToHalt",
      "irqRequested",
      "irqType",
      // Registers
      "REG_ACC",
      "REG_X",
      "REG_Y",
      "REG_SP",
      "REG_PC",
      "REG_PC_NEW",
      "REG_STATUS",
      // Status
      "F_CARRY",
      "F_DECIMAL",
      "F_INTERRUPT",
      "F_INTERRUPT_NEW",
      "F_OVERFLOW",
      "F_SIGN",
      "F_ZERO",
      "F_NOTUSED",
      "F_NOTUSED_NEW",
      "F_BRK",
      "F_BRK_NEW",
    ],
    toJSON: function () {
      return a.toJSON(this);
    },
    fromJSON: function (t) {
      a.fromJSON(this, t);
    },
  };
  var s = function () {
    this.opdata = new Array(256);
    for (var t = 0; t < 256; t++) this.opdata[t] = 255;
    this.setOp(this.INS_ADC, 105, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_ADC, 101, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_ADC, 117, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_ADC, 109, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_ADC, 125, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_ADC, 121, this.ADDR_ABSY, 3, 4),
      this.setOp(this.INS_ADC, 97, this.ADDR_PREIDXIND, 2, 6),
      this.setOp(this.INS_ADC, 113, this.ADDR_POSTIDXIND, 2, 5),
      this.setOp(this.INS_AND, 41, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_AND, 37, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_AND, 53, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_AND, 45, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_AND, 61, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_AND, 57, this.ADDR_ABSY, 3, 4),
      this.setOp(this.INS_AND, 33, this.ADDR_PREIDXIND, 2, 6),
      this.setOp(this.INS_AND, 49, this.ADDR_POSTIDXIND, 2, 5),
      this.setOp(this.INS_ASL, 10, this.ADDR_ACC, 1, 2),
      this.setOp(this.INS_ASL, 6, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_ASL, 22, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_ASL, 14, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_ASL, 30, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_BCC, 144, this.ADDR_REL, 2, 2),
      this.setOp(this.INS_BCS, 176, this.ADDR_REL, 2, 2),
      this.setOp(this.INS_BEQ, 240, this.ADDR_REL, 2, 2),
      this.setOp(this.INS_BIT, 36, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_BIT, 44, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_BMI, 48, this.ADDR_REL, 2, 2),
      this.setOp(this.INS_BNE, 208, this.ADDR_REL, 2, 2),
      this.setOp(this.INS_BPL, 16, this.ADDR_REL, 2, 2),
      this.setOp(this.INS_BRK, 0, this.ADDR_IMP, 1, 7),
      this.setOp(this.INS_BVC, 80, this.ADDR_REL, 2, 2),
      this.setOp(this.INS_BVS, 112, this.ADDR_REL, 2, 2),
      this.setOp(this.INS_CLC, 24, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_CLD, 216, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_CLI, 88, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_CLV, 184, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_CMP, 201, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_CMP, 197, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_CMP, 213, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_CMP, 205, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_CMP, 221, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_CMP, 217, this.ADDR_ABSY, 3, 4),
      this.setOp(this.INS_CMP, 193, this.ADDR_PREIDXIND, 2, 6),
      this.setOp(this.INS_CMP, 209, this.ADDR_POSTIDXIND, 2, 5),
      this.setOp(this.INS_CPX, 224, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_CPX, 228, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_CPX, 236, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_CPY, 192, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_CPY, 196, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_CPY, 204, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_DEC, 198, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_DEC, 214, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_DEC, 206, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_DEC, 222, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_DEX, 202, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_DEY, 136, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_EOR, 73, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_EOR, 69, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_EOR, 85, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_EOR, 77, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_EOR, 93, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_EOR, 89, this.ADDR_ABSY, 3, 4),
      this.setOp(this.INS_EOR, 65, this.ADDR_PREIDXIND, 2, 6),
      this.setOp(this.INS_EOR, 81, this.ADDR_POSTIDXIND, 2, 5),
      this.setOp(this.INS_INC, 230, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_INC, 246, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_INC, 238, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_INC, 254, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_INX, 232, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_INY, 200, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_JMP, 76, this.ADDR_ABS, 3, 3),
      this.setOp(this.INS_JMP, 108, this.ADDR_INDABS, 3, 5),
      this.setOp(this.INS_JSR, 32, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_LDA, 169, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_LDA, 165, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_LDA, 181, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_LDA, 173, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_LDA, 189, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_LDA, 185, this.ADDR_ABSY, 3, 4),
      this.setOp(this.INS_LDA, 161, this.ADDR_PREIDXIND, 2, 6),
      this.setOp(this.INS_LDA, 177, this.ADDR_POSTIDXIND, 2, 5),
      this.setOp(this.INS_LDX, 162, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_LDX, 166, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_LDX, 182, this.ADDR_ZPY, 2, 4),
      this.setOp(this.INS_LDX, 174, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_LDX, 190, this.ADDR_ABSY, 3, 4),
      this.setOp(this.INS_LDY, 160, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_LDY, 164, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_LDY, 180, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_LDY, 172, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_LDY, 188, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_LSR, 74, this.ADDR_ACC, 1, 2),
      this.setOp(this.INS_LSR, 70, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_LSR, 86, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_LSR, 78, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_LSR, 94, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_NOP, 26, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_NOP, 58, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_NOP, 90, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_NOP, 122, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_NOP, 218, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_NOP, 234, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_NOP, 250, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_ORA, 9, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_ORA, 5, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_ORA, 21, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_ORA, 13, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_ORA, 29, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_ORA, 25, this.ADDR_ABSY, 3, 4),
      this.setOp(this.INS_ORA, 1, this.ADDR_PREIDXIND, 2, 6),
      this.setOp(this.INS_ORA, 17, this.ADDR_POSTIDXIND, 2, 5),
      this.setOp(this.INS_PHA, 72, this.ADDR_IMP, 1, 3),
      this.setOp(this.INS_PHP, 8, this.ADDR_IMP, 1, 3),
      this.setOp(this.INS_PLA, 104, this.ADDR_IMP, 1, 4),
      this.setOp(this.INS_PLP, 40, this.ADDR_IMP, 1, 4),
      this.setOp(this.INS_ROL, 42, this.ADDR_ACC, 1, 2),
      this.setOp(this.INS_ROL, 38, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_ROL, 54, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_ROL, 46, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_ROL, 62, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_ROR, 106, this.ADDR_ACC, 1, 2),
      this.setOp(this.INS_ROR, 102, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_ROR, 118, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_ROR, 110, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_ROR, 126, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_RTI, 64, this.ADDR_IMP, 1, 6),
      this.setOp(this.INS_RTS, 96, this.ADDR_IMP, 1, 6),
      this.setOp(this.INS_SBC, 233, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_SBC, 229, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_SBC, 245, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_SBC, 237, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_SBC, 253, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_SBC, 249, this.ADDR_ABSY, 3, 4),
      this.setOp(this.INS_SBC, 225, this.ADDR_PREIDXIND, 2, 6),
      this.setOp(this.INS_SBC, 241, this.ADDR_POSTIDXIND, 2, 5),
      this.setOp(this.INS_SEC, 56, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_SED, 248, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_SEI, 120, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_STA, 133, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_STA, 149, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_STA, 141, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_STA, 157, this.ADDR_ABSX, 3, 5),
      this.setOp(this.INS_STA, 153, this.ADDR_ABSY, 3, 5),
      this.setOp(this.INS_STA, 129, this.ADDR_PREIDXIND, 2, 6),
      this.setOp(this.INS_STA, 145, this.ADDR_POSTIDXIND, 2, 6),
      this.setOp(this.INS_STX, 134, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_STX, 150, this.ADDR_ZPY, 2, 4),
      this.setOp(this.INS_STX, 142, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_STY, 132, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_STY, 148, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_STY, 140, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_TAX, 170, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_TAY, 168, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_TSX, 186, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_TXA, 138, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_TXS, 154, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_TYA, 152, this.ADDR_IMP, 1, 2),
      this.setOp(this.INS_ALR, 75, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_ANC, 11, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_ANC, 43, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_ARR, 107, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_AXS, 203, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_LAX, 163, this.ADDR_PREIDXIND, 2, 6),
      this.setOp(this.INS_LAX, 167, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_LAX, 175, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_LAX, 179, this.ADDR_POSTIDXIND, 2, 5),
      this.setOp(this.INS_LAX, 183, this.ADDR_ZPY, 2, 4),
      this.setOp(this.INS_LAX, 191, this.ADDR_ABSY, 3, 4),
      this.setOp(this.INS_SAX, 131, this.ADDR_PREIDXIND, 2, 6),
      this.setOp(this.INS_SAX, 135, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_SAX, 143, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_SAX, 151, this.ADDR_ZPY, 2, 4),
      this.setOp(this.INS_DCP, 195, this.ADDR_PREIDXIND, 2, 8),
      this.setOp(this.INS_DCP, 199, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_DCP, 207, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_DCP, 211, this.ADDR_POSTIDXIND, 2, 8),
      this.setOp(this.INS_DCP, 215, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_DCP, 219, this.ADDR_ABSY, 3, 7),
      this.setOp(this.INS_DCP, 223, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_ISC, 227, this.ADDR_PREIDXIND, 2, 8),
      this.setOp(this.INS_ISC, 231, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_ISC, 239, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_ISC, 243, this.ADDR_POSTIDXIND, 2, 8),
      this.setOp(this.INS_ISC, 247, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_ISC, 251, this.ADDR_ABSY, 3, 7),
      this.setOp(this.INS_ISC, 255, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_RLA, 35, this.ADDR_PREIDXIND, 2, 8),
      this.setOp(this.INS_RLA, 39, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_RLA, 47, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_RLA, 51, this.ADDR_POSTIDXIND, 2, 8),
      this.setOp(this.INS_RLA, 55, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_RLA, 59, this.ADDR_ABSY, 3, 7),
      this.setOp(this.INS_RLA, 63, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_RRA, 99, this.ADDR_PREIDXIND, 2, 8),
      this.setOp(this.INS_RRA, 103, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_RRA, 111, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_RRA, 115, this.ADDR_POSTIDXIND, 2, 8),
      this.setOp(this.INS_RRA, 119, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_RRA, 123, this.ADDR_ABSY, 3, 7),
      this.setOp(this.INS_RRA, 127, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_SLO, 3, this.ADDR_PREIDXIND, 2, 8),
      this.setOp(this.INS_SLO, 7, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_SLO, 15, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_SLO, 19, this.ADDR_POSTIDXIND, 2, 8),
      this.setOp(this.INS_SLO, 23, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_SLO, 27, this.ADDR_ABSY, 3, 7),
      this.setOp(this.INS_SLO, 31, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_SRE, 67, this.ADDR_PREIDXIND, 2, 8),
      this.setOp(this.INS_SRE, 71, this.ADDR_ZP, 2, 5),
      this.setOp(this.INS_SRE, 79, this.ADDR_ABS, 3, 6),
      this.setOp(this.INS_SRE, 83, this.ADDR_POSTIDXIND, 2, 8),
      this.setOp(this.INS_SRE, 87, this.ADDR_ZPX, 2, 6),
      this.setOp(this.INS_SRE, 91, this.ADDR_ABSY, 3, 7),
      this.setOp(this.INS_SRE, 95, this.ADDR_ABSX, 3, 7),
      this.setOp(this.INS_SKB, 128, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_SKB, 130, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_SKB, 137, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_SKB, 194, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_SKB, 226, this.ADDR_IMM, 2, 2),
      this.setOp(this.INS_IGN, 12, this.ADDR_ABS, 3, 4),
      this.setOp(this.INS_IGN, 28, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_IGN, 60, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_IGN, 92, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_IGN, 124, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_IGN, 220, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_IGN, 252, this.ADDR_ABSX, 3, 4),
      this.setOp(this.INS_IGN, 4, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_IGN, 68, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_IGN, 100, this.ADDR_ZP, 2, 3),
      this.setOp(this.INS_IGN, 20, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_IGN, 52, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_IGN, 84, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_IGN, 116, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_IGN, 212, this.ADDR_ZPX, 2, 4),
      this.setOp(this.INS_IGN, 244, this.ADDR_ZPX, 2, 4),
      (this.cycTable = new Array(
        /*0x00*/
        7,
        6,
        2,
        8,
        3,
        3,
        5,
        5,
        3,
        2,
        2,
        2,
        4,
        4,
        6,
        6,
        /*0x10*/
        2,
        5,
        2,
        8,
        4,
        4,
        6,
        6,
        2,
        4,
        2,
        7,
        4,
        4,
        7,
        7,
        /*0x20*/
        6,
        6,
        2,
        8,
        3,
        3,
        5,
        5,
        4,
        2,
        2,
        2,
        4,
        4,
        6,
        6,
        /*0x30*/
        2,
        5,
        2,
        8,
        4,
        4,
        6,
        6,
        2,
        4,
        2,
        7,
        4,
        4,
        7,
        7,
        /*0x40*/
        6,
        6,
        2,
        8,
        3,
        3,
        5,
        5,
        3,
        2,
        2,
        2,
        3,
        4,
        6,
        6,
        /*0x50*/
        2,
        5,
        2,
        8,
        4,
        4,
        6,
        6,
        2,
        4,
        2,
        7,
        4,
        4,
        7,
        7,
        /*0x60*/
        6,
        6,
        2,
        8,
        3,
        3,
        5,
        5,
        4,
        2,
        2,
        2,
        5,
        4,
        6,
        6,
        /*0x70*/
        2,
        5,
        2,
        8,
        4,
        4,
        6,
        6,
        2,
        4,
        2,
        7,
        4,
        4,
        7,
        7,
        /*0x80*/
        2,
        6,
        2,
        6,
        3,
        3,
        3,
        3,
        2,
        2,
        2,
        2,
        4,
        4,
        4,
        4,
        /*0x90*/
        2,
        6,
        2,
        6,
        4,
        4,
        4,
        4,
        2,
        5,
        2,
        5,
        5,
        5,
        5,
        5,
        /*0xA0*/
        2,
        6,
        2,
        6,
        3,
        3,
        3,
        3,
        2,
        2,
        2,
        2,
        4,
        4,
        4,
        4,
        /*0xB0*/
        2,
        5,
        2,
        5,
        4,
        4,
        4,
        4,
        2,
        4,
        2,
        4,
        4,
        4,
        4,
        4,
        /*0xC0*/
        2,
        6,
        2,
        8,
        3,
        3,
        5,
        5,
        2,
        2,
        2,
        2,
        4,
        4,
        6,
        6,
        /*0xD0*/
        2,
        5,
        2,
        8,
        4,
        4,
        6,
        6,
        2,
        4,
        2,
        7,
        4,
        4,
        7,
        7,
        /*0xE0*/
        2,
        6,
        3,
        8,
        3,
        3,
        5,
        5,
        2,
        2,
        2,
        2,
        4,
        4,
        6,
        6,
        /*0xF0*/
        2,
        5,
        2,
        8,
        4,
        4,
        6,
        6,
        2,
        4,
        2,
        7,
        4,
        4,
        7,
        7
      )),
      (this.instname = new Array(70)),
      (this.instname[0] = "ADC"),
      (this.instname[1] = "AND"),
      (this.instname[2] = "ASL"),
      (this.instname[3] = "BCC"),
      (this.instname[4] = "BCS"),
      (this.instname[5] = "BEQ"),
      (this.instname[6] = "BIT"),
      (this.instname[7] = "BMI"),
      (this.instname[8] = "BNE"),
      (this.instname[9] = "BPL"),
      (this.instname[10] = "BRK"),
      (this.instname[11] = "BVC"),
      (this.instname[12] = "BVS"),
      (this.instname[13] = "CLC"),
      (this.instname[14] = "CLD"),
      (this.instname[15] = "CLI"),
      (this.instname[16] = "CLV"),
      (this.instname[17] = "CMP"),
      (this.instname[18] = "CPX"),
      (this.instname[19] = "CPY"),
      (this.instname[20] = "DEC"),
      (this.instname[21] = "DEX"),
      (this.instname[22] = "DEY"),
      (this.instname[23] = "EOR"),
      (this.instname[24] = "INC"),
      (this.instname[25] = "INX"),
      (this.instname[26] = "INY"),
      (this.instname[27] = "JMP"),
      (this.instname[28] = "JSR"),
      (this.instname[29] = "LDA"),
      (this.instname[30] = "LDX"),
      (this.instname[31] = "LDY"),
      (this.instname[32] = "LSR"),
      (this.instname[33] = "NOP"),
      (this.instname[34] = "ORA"),
      (this.instname[35] = "PHA"),
      (this.instname[36] = "PHP"),
      (this.instname[37] = "PLA"),
      (this.instname[38] = "PLP"),
      (this.instname[39] = "ROL"),
      (this.instname[40] = "ROR"),
      (this.instname[41] = "RTI"),
      (this.instname[42] = "RTS"),
      (this.instname[43] = "SBC"),
      (this.instname[44] = "SEC"),
      (this.instname[45] = "SED"),
      (this.instname[46] = "SEI"),
      (this.instname[47] = "STA"),
      (this.instname[48] = "STX"),
      (this.instname[49] = "STY"),
      (this.instname[50] = "TAX"),
      (this.instname[51] = "TAY"),
      (this.instname[52] = "TSX"),
      (this.instname[53] = "TXA"),
      (this.instname[54] = "TXS"),
      (this.instname[55] = "TYA"),
      (this.instname[56] = "ALR"),
      (this.instname[57] = "ANC"),
      (this.instname[58] = "ARR"),
      (this.instname[59] = "AXS"),
      (this.instname[60] = "LAX"),
      (this.instname[61] = "SAX"),
      (this.instname[62] = "DCP"),
      (this.instname[63] = "ISC"),
      (this.instname[64] = "RLA"),
      (this.instname[65] = "RRA"),
      (this.instname[66] = "SLO"),
      (this.instname[67] = "SRE"),
      (this.instname[68] = "SKB"),
      (this.instname[69] = "IGN"),
      (this.addrDesc = new Array(
        "Zero Page           ",
        "Relative            ",
        "Implied             ",
        "Absolute            ",
        "Accumulator         ",
        "Immediate           ",
        "Zero Page,X         ",
        "Zero Page,Y         ",
        "Absolute,X          ",
        "Absolute,Y          ",
        "Preindexed Indirect ",
        "Postindexed Indirect",
        "Indirect Absolute   "
      ));
  };
  return (
    (s.prototype = {
      INS_ADC: 0,
      INS_AND: 1,
      INS_ASL: 2,
      INS_BCC: 3,
      INS_BCS: 4,
      INS_BEQ: 5,
      INS_BIT: 6,
      INS_BMI: 7,
      INS_BNE: 8,
      INS_BPL: 9,
      INS_BRK: 10,
      INS_BVC: 11,
      INS_BVS: 12,
      INS_CLC: 13,
      INS_CLD: 14,
      INS_CLI: 15,
      INS_CLV: 16,
      INS_CMP: 17,
      INS_CPX: 18,
      INS_CPY: 19,
      INS_DEC: 20,
      INS_DEX: 21,
      INS_DEY: 22,
      INS_EOR: 23,
      INS_INC: 24,
      INS_INX: 25,
      INS_INY: 26,
      INS_JMP: 27,
      INS_JSR: 28,
      INS_LDA: 29,
      INS_LDX: 30,
      INS_LDY: 31,
      INS_LSR: 32,
      INS_NOP: 33,
      INS_ORA: 34,
      INS_PHA: 35,
      INS_PHP: 36,
      INS_PLA: 37,
      INS_PLP: 38,
      INS_ROL: 39,
      INS_ROR: 40,
      INS_RTI: 41,
      INS_RTS: 42,
      INS_SBC: 43,
      INS_SEC: 44,
      INS_SED: 45,
      INS_SEI: 46,
      INS_STA: 47,
      INS_STX: 48,
      INS_STY: 49,
      INS_TAX: 50,
      INS_TAY: 51,
      INS_TSX: 52,
      INS_TXA: 53,
      INS_TXS: 54,
      INS_TYA: 55,
      INS_ALR: 56,
      INS_ANC: 57,
      INS_ARR: 58,
      INS_AXS: 59,
      INS_LAX: 60,
      INS_SAX: 61,
      INS_DCP: 62,
      INS_ISC: 63,
      INS_RLA: 64,
      INS_RRA: 65,
      INS_SLO: 66,
      INS_SRE: 67,
      INS_SKB: 68,
      INS_IGN: 69,
      INS_DUMMY: 70,
      // dummy instruction used for 'halting' the processor some cycles
      // -------------------------------- //
      // Addressing modes:
      ADDR_ZP: 0,
      ADDR_REL: 1,
      ADDR_IMP: 2,
      ADDR_ABS: 3,
      ADDR_ACC: 4,
      ADDR_IMM: 5,
      ADDR_ZPX: 6,
      ADDR_ZPY: 7,
      ADDR_ABSX: 8,
      ADDR_ABSY: 9,
      ADDR_PREIDXIND: 10,
      ADDR_POSTIDXIND: 11,
      ADDR_INDABS: 12,
      setOp: function (t, o, e, i, r) {
        this.opdata[o] =
          (t & 255) | ((e & 255) << 8) | ((i & 255) << 16) | ((r & 255) << 24);
      },
    }),
    (ot = h),
    ot
  );
}
var lt, Lt;
function hi() {
  if (Lt) return lt;
  Lt = 1;
  var a = function () {
    (this.pix = new Array(64)),
      (this.fbIndex = null),
      (this.tIndex = null),
      (this.x = null),
      (this.y = null),
      (this.w = null),
      (this.h = null),
      (this.incX = null),
      (this.incY = null),
      (this.palIndex = null),
      (this.tpri = null),
      (this.c = null),
      (this.initialized = !1),
      (this.opaque = new Array(8));
  };
  return (
    (a.prototype = {
      setBuffer: function (h) {
        for (this.y = 0; this.y < 8; this.y++)
          this.setScanline(this.y, h[this.y], h[this.y + 8]);
      },
      setScanline: function (h, s, t) {
        for (
          this.initialized = !0, this.tIndex = h << 3, this.x = 0;
          this.x < 8;
          this.x++
        )
          (this.pix[this.tIndex + this.x] =
            ((s >> (7 - this.x)) & 1) + (((t >> (7 - this.x)) & 1) << 1)),
            this.pix[this.tIndex + this.x] === 0 && (this.opaque[h] = !1);
      },
      render: function (h, s, t, o, e, i, r, n, u, l, f, p, R) {
        if (!(i < -7 || i >= 256 || r < -7 || r >= 240))
          if (
            ((this.w = o - s),
            (this.h = e - t),
            i < 0 && (s -= i),
            i + o >= 256 && (o = 256 - i),
            r < 0 && (t -= r),
            r + e >= 240 && (e = 240 - r),
            !l && !f)
          )
            for (
              this.fbIndex = (r << 8) + i, this.tIndex = 0, this.y = 0;
              this.y < 8;
              this.y++
            ) {
              for (this.x = 0; this.x < 8; this.x++)
                this.x >= s &&
                  this.x < o &&
                  this.y >= t &&
                  this.y < e &&
                  ((this.palIndex = this.pix[this.tIndex]),
                  (this.tpri = R[this.fbIndex]),
                  this.palIndex !== 0 &&
                    p <= (this.tpri & 255) &&
                    ((h[this.fbIndex] = u[this.palIndex + n]),
                    (this.tpri = (this.tpri & 3840) | p),
                    (R[this.fbIndex] = this.tpri))),
                  this.fbIndex++,
                  this.tIndex++;
              (this.fbIndex -= 8), (this.fbIndex += 256);
            }
          else if (l && !f)
            for (
              this.fbIndex = (r << 8) + i, this.tIndex = 7, this.y = 0;
              this.y < 8;
              this.y++
            ) {
              for (this.x = 0; this.x < 8; this.x++)
                this.x >= s &&
                  this.x < o &&
                  this.y >= t &&
                  this.y < e &&
                  ((this.palIndex = this.pix[this.tIndex]),
                  (this.tpri = R[this.fbIndex]),
                  this.palIndex !== 0 &&
                    p <= (this.tpri & 255) &&
                    ((h[this.fbIndex] = u[this.palIndex + n]),
                    (this.tpri = (this.tpri & 3840) | p),
                    (R[this.fbIndex] = this.tpri))),
                  this.fbIndex++,
                  this.tIndex--;
              (this.fbIndex -= 8), (this.fbIndex += 256), (this.tIndex += 16);
            }
          else if (f && !l)
            for (
              this.fbIndex = (r << 8) + i, this.tIndex = 56, this.y = 0;
              this.y < 8;
              this.y++
            ) {
              for (this.x = 0; this.x < 8; this.x++)
                this.x >= s &&
                  this.x < o &&
                  this.y >= t &&
                  this.y < e &&
                  ((this.palIndex = this.pix[this.tIndex]),
                  (this.tpri = R[this.fbIndex]),
                  this.palIndex !== 0 &&
                    p <= (this.tpri & 255) &&
                    ((h[this.fbIndex] = u[this.palIndex + n]),
                    (this.tpri = (this.tpri & 3840) | p),
                    (R[this.fbIndex] = this.tpri))),
                  this.fbIndex++,
                  this.tIndex++;
              (this.fbIndex -= 8), (this.fbIndex += 256), (this.tIndex -= 16);
            }
          else
            for (
              this.fbIndex = (r << 8) + i, this.tIndex = 63, this.y = 0;
              this.y < 8;
              this.y++
            ) {
              for (this.x = 0; this.x < 8; this.x++)
                this.x >= s &&
                  this.x < o &&
                  this.y >= t &&
                  this.y < e &&
                  ((this.palIndex = this.pix[this.tIndex]),
                  (this.tpri = R[this.fbIndex]),
                  this.palIndex !== 0 &&
                    p <= (this.tpri & 255) &&
                    ((h[this.fbIndex] = u[this.palIndex + n]),
                    (this.tpri = (this.tpri & 3840) | p),
                    (R[this.fbIndex] = this.tpri))),
                  this.fbIndex++,
                  this.tIndex--;
              (this.fbIndex -= 8), (this.fbIndex += 256);
            }
      },
      isTransparent: function (h, s) {
        return this.pix[(s << 3) + h] === 0;
      },
      toJSON: function () {
        return {
          opaque: this.opaque,
          pix: this.pix,
        };
      },
      fromJSON: function (h) {
        (this.opaque = h.opaque), (this.pix = h.pix);
      },
    }),
    (lt = a),
    lt
  );
}
var ut, wt;
function Wi() {
  if (wt) return ut;
  wt = 1;
  var a = hi(),
    h = At(),
    s = function (e) {
      (this.nes = e),
        (this.vramMem = null),
        (this.spriteMem = null),
        (this.vramAddress = null),
        (this.vramTmpAddress = null),
        (this.vramBufferedReadValue = null),
        (this.firstWrite = null),
        (this.sramAddress = null),
        (this.currentMirroring = null),
        (this.requestEndFrame = null),
        (this.nmiOk = null),
        (this.dummyCycleToggle = null),
        (this.validTileData = null),
        (this.nmiCounter = null),
        (this.scanlineAlreadyRendered = null),
        (this.f_nmiOnVblank = null),
        (this.f_spriteSize = null),
        (this.f_bgPatternTable = null),
        (this.f_spPatternTable = null),
        (this.f_addrInc = null),
        (this.f_nTblAddress = null),
        (this.f_color = null),
        (this.f_spVisibility = null),
        (this.f_bgVisibility = null),
        (this.f_spClipping = null),
        (this.f_bgClipping = null),
        (this.f_dispType = null),
        (this.cntFV = null),
        (this.cntV = null),
        (this.cntH = null),
        (this.cntVT = null),
        (this.cntHT = null),
        (this.regFV = null),
        (this.regV = null),
        (this.regH = null),
        (this.regVT = null),
        (this.regHT = null),
        (this.regFH = null),
        (this.regS = null),
        (this.curNt = null),
        (this.attrib = null),
        (this.buffer = null),
        (this.bgbuffer = null),
        (this.pixrendered = null),
        (this.validTileData = null),
        (this.scantile = null),
        (this.scanline = null),
        (this.lastRenderedScanline = null),
        (this.curX = null),
        (this.sprX = null),
        (this.sprY = null),
        (this.sprTile = null),
        (this.sprCol = null),
        (this.vertFlip = null),
        (this.horiFlip = null),
        (this.bgPriority = null),
        (this.spr0HitX = null),
        (this.spr0HitY = null),
        (this.hitSpr0 = null),
        (this.sprPalette = null),
        (this.imgPalette = null),
        (this.ptTile = null),
        (this.ntable1 = null),
        (this.currentMirroring = null),
        (this.nameTable = null),
        (this.vramMirrorTable = null),
        (this.palTable = null),
        (this.showSpr0Hit = !1),
        (this.clipToTvSize = !0),
        this.reset();
    };
  s.prototype = {
    // Status flags:
    STATUS_VRAMWRITE: 4,
    STATUS_SLSPRITECOUNT: 5,
    STATUS_SPRITE0HIT: 6,
    STATUS_VBLANK: 7,
    reset: function () {
      var e;
      for (
        this.vramMem = new Array(32768), this.spriteMem = new Array(256), e = 0;
        e < this.vramMem.length;
        e++
      )
        this.vramMem[e] = 0;
      for (e = 0; e < this.spriteMem.length; e++) this.spriteMem[e] = 0;
      for (
        this.vramAddress = null,
          this.vramTmpAddress = null,
          this.vramBufferedReadValue = 0,
          this.firstWrite = !0,
          this.sramAddress = 0,
          this.currentMirroring = -1,
          this.requestEndFrame = !1,
          this.nmiOk = !1,
          this.dummyCycleToggle = !1,
          this.validTileData = !1,
          this.nmiCounter = 0,
          this.scanlineAlreadyRendered = null,
          this.f_nmiOnVblank = 0,
          this.f_spriteSize = 0,
          this.f_bgPatternTable = 0,
          this.f_spPatternTable = 0,
          this.f_addrInc = 0,
          this.f_nTblAddress = 0,
          this.f_color = 0,
          this.f_spVisibility = 0,
          this.f_bgVisibility = 0,
          this.f_spClipping = 0,
          this.f_bgClipping = 0,
          this.f_dispType = 0,
          this.cntFV = 0,
          this.cntV = 0,
          this.cntH = 0,
          this.cntVT = 0,
          this.cntHT = 0,
          this.regFV = 0,
          this.regV = 0,
          this.regH = 0,
          this.regVT = 0,
          this.regHT = 0,
          this.regFH = 0,
          this.regS = 0,
          this.curNt = null,
          this.attrib = new Array(32),
          this.buffer = new Array(256 * 240),
          this.bgbuffer = new Array(256 * 240),
          this.pixrendered = new Array(256 * 240),
          this.validTileData = null,
          this.scantile = new Array(32),
          this.scanline = 0,
          this.lastRenderedScanline = -1,
          this.curX = 0,
          this.sprX = new Array(64),
          this.sprY = new Array(64),
          this.sprTile = new Array(64),
          this.sprCol = new Array(64),
          this.vertFlip = new Array(64),
          this.horiFlip = new Array(64),
          this.bgPriority = new Array(64),
          this.spr0HitX = 0,
          this.spr0HitY = 0,
          this.hitSpr0 = !1,
          this.sprPalette = new Array(16),
          this.imgPalette = new Array(16),
          this.ptTile = new Array(512),
          e = 0;
        e < 512;
        e++
      )
        this.ptTile[e] = new a();
      for (
        this.ntable1 = new Array(4),
          this.currentMirroring = -1,
          this.nameTable = new Array(4),
          e = 0;
        e < 4;
        e++
      )
        this.nameTable[e] = new t(32, 32, "Nt" + e);
      for (this.vramMirrorTable = new Array(32768), e = 0; e < 32768; e++)
        this.vramMirrorTable[e] = e;
      (this.palTable = new o()),
        this.palTable.loadNTSCPalette(),
        this.updateControlReg1(0),
        this.updateControlReg2(0);
    },
    // Sets Nametable mirroring.
    setMirroring: function (e) {
      if (e !== this.currentMirroring) {
        (this.currentMirroring = e),
          this.triggerRendering(),
          this.vramMirrorTable === null &&
            (this.vramMirrorTable = new Array(32768));
        for (var i = 0; i < 32768; i++) this.vramMirrorTable[i] = i;
        this.defineMirrorRegion(16160, 16128, 32),
          this.defineMirrorRegion(16192, 16128, 32),
          this.defineMirrorRegion(16256, 16128, 32),
          this.defineMirrorRegion(16320, 16128, 32),
          this.defineMirrorRegion(12288, 8192, 3840),
          this.defineMirrorRegion(16384, 0, 16384),
          e === this.nes.rom.HORIZONTAL_MIRRORING
            ? ((this.ntable1[0] = 0),
              (this.ntable1[1] = 0),
              (this.ntable1[2] = 1),
              (this.ntable1[3] = 1),
              this.defineMirrorRegion(9216, 8192, 1024),
              this.defineMirrorRegion(11264, 10240, 1024))
            : e === this.nes.rom.VERTICAL_MIRRORING
            ? ((this.ntable1[0] = 0),
              (this.ntable1[1] = 1),
              (this.ntable1[2] = 0),
              (this.ntable1[3] = 1),
              this.defineMirrorRegion(10240, 8192, 1024),
              this.defineMirrorRegion(11264, 9216, 1024))
            : e === this.nes.rom.SINGLESCREEN_MIRRORING
            ? ((this.ntable1[0] = 0),
              (this.ntable1[1] = 0),
              (this.ntable1[2] = 0),
              (this.ntable1[3] = 0),
              this.defineMirrorRegion(9216, 8192, 1024),
              this.defineMirrorRegion(10240, 8192, 1024),
              this.defineMirrorRegion(11264, 8192, 1024))
            : e === this.nes.rom.SINGLESCREEN_MIRRORING2
            ? ((this.ntable1[0] = 1),
              (this.ntable1[1] = 1),
              (this.ntable1[2] = 1),
              (this.ntable1[3] = 1),
              this.defineMirrorRegion(9216, 9216, 1024),
              this.defineMirrorRegion(10240, 9216, 1024),
              this.defineMirrorRegion(11264, 9216, 1024))
            : ((this.ntable1[0] = 0),
              (this.ntable1[1] = 1),
              (this.ntable1[2] = 2),
              (this.ntable1[3] = 3));
      }
    },
    // Define a mirrored area in the address lookup table.
    // Assumes the regions don't overlap.
    // The 'to' region is the region that is physically in memory.
    defineMirrorRegion: function (e, i, r) {
      for (var n = 0; n < r; n++) this.vramMirrorTable[e + n] = i + n;
    },
    startVBlank: function () {
      this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NMI),
        this.lastRenderedScanline < 239 &&
          this.renderFramePartially(
            this.lastRenderedScanline + 1,
            240 - this.lastRenderedScanline
          ),
        this.endFrame(),
        (this.lastRenderedScanline = -1);
    },
    endScanline: function () {
      switch (this.scanline) {
        case 19:
          this.dummyCycleToggle &&
            ((this.curX = 1), (this.dummyCycleToggle = !this.dummyCycleToggle));
          break;
        case 20:
          this.setStatusFlag(this.STATUS_VBLANK, !1),
            this.setStatusFlag(this.STATUS_SPRITE0HIT, !1),
            (this.hitSpr0 = !1),
            (this.spr0HitX = -1),
            (this.spr0HitY = -1),
            (this.f_bgVisibility === 1 || this.f_spVisibility === 1) &&
              ((this.cntFV = this.regFV),
              (this.cntV = this.regV),
              (this.cntH = this.regH),
              (this.cntVT = this.regVT),
              (this.cntHT = this.regHT),
              this.f_bgVisibility === 1 && this.renderBgScanline(!1, 0)),
            this.f_bgVisibility === 1 &&
              this.f_spVisibility === 1 &&
              this.checkSprite0(0),
            (this.f_bgVisibility === 1 || this.f_spVisibility === 1) &&
              this.nes.mmap.clockIrqCounter();
          break;
        case 261:
          this.setStatusFlag(this.STATUS_VBLANK, !0),
            (this.requestEndFrame = !0),
            (this.nmiCounter = 9),
            (this.scanline = -1);
          break;
        default:
          this.scanline >= 21 &&
            this.scanline <= 260 &&
            (this.f_bgVisibility === 1 &&
              (this.scanlineAlreadyRendered ||
                ((this.cntHT = this.regHT),
                (this.cntH = this.regH),
                this.renderBgScanline(!0, this.scanline + 1 - 21)),
              (this.scanlineAlreadyRendered = !1),
              !this.hitSpr0 &&
                this.f_spVisibility === 1 &&
                this.sprX[0] >= -7 &&
                this.sprX[0] < 256 &&
                this.sprY[0] + 1 <= this.scanline - 20 &&
                this.sprY[0] + 1 + (this.f_spriteSize === 0 ? 8 : 16) >=
                  this.scanline - 20 &&
                this.checkSprite0(this.scanline - 20) &&
                (this.hitSpr0 = !0)),
            (this.f_bgVisibility === 1 || this.f_spVisibility === 1) &&
              this.nes.mmap.clockIrqCounter());
      }
      this.scanline++, this.regsToAddress(), this.cntsToAddress();
    },
    startFrame: function () {
      var e = 0;
      if (this.f_dispType === 0) e = this.imgPalette[0];
      else
        switch (this.f_color) {
          case 0:
            e = 0;
            break;
          case 1:
            e = 65280;
            break;
          case 2:
            e = 16711680;
            break;
          case 3:
            e = 0;
            break;
          case 4:
            e = 255;
            break;
          default:
            e = 0;
        }
      var i = this.buffer,
        r;
      for (r = 0; r < 256 * 240; r++) i[r] = e;
      var n = this.pixrendered;
      for (r = 0; r < n.length; r++) n[r] = 65;
    },
    endFrame: function () {
      var e,
        i,
        r,
        n = this.buffer;
      if (this.showSpr0Hit) {
        if (
          this.sprX[0] >= 0 &&
          this.sprX[0] < 256 &&
          this.sprY[0] >= 0 &&
          this.sprY[0] < 240
        ) {
          for (e = 0; e < 256; e++) n[(this.sprY[0] << 8) + e] = 16733525;
          for (e = 0; e < 240; e++) n[(e << 8) + this.sprX[0]] = 16733525;
        }
        if (
          this.spr0HitX >= 0 &&
          this.spr0HitX < 256 &&
          this.spr0HitY >= 0 &&
          this.spr0HitY < 240
        ) {
          for (e = 0; e < 256; e++) n[(this.spr0HitY << 8) + e] = 5635925;
          for (e = 0; e < 240; e++) n[(e << 8) + this.spr0HitX] = 5635925;
        }
      }
      if (
        this.clipToTvSize ||
        this.f_bgClipping === 0 ||
        this.f_spClipping === 0
      )
        for (r = 0; r < 240; r++) for (i = 0; i < 8; i++) n[(r << 8) + i] = 0;
      if (this.clipToTvSize)
        for (r = 0; r < 240; r++)
          for (i = 0; i < 8; i++) n[(r << 8) + 255 - i] = 0;
      if (this.clipToTvSize)
        for (r = 0; r < 8; r++)
          for (i = 0; i < 256; i++)
            (n[(r << 8) + i] = 0), (n[((239 - r) << 8) + i] = 0);
      this.nes.ui.writeFrame(n);
    },
    updateControlReg1: function (e) {
      this.triggerRendering(),
        (this.f_nmiOnVblank = (e >> 7) & 1),
        (this.f_spriteSize = (e >> 5) & 1),
        (this.f_bgPatternTable = (e >> 4) & 1),
        (this.f_spPatternTable = (e >> 3) & 1),
        (this.f_addrInc = (e >> 2) & 1),
        (this.f_nTblAddress = e & 3),
        (this.regV = (e >> 1) & 1),
        (this.regH = e & 1),
        (this.regS = (e >> 4) & 1);
    },
    updateControlReg2: function (e) {
      this.triggerRendering(),
        (this.f_color = (e >> 5) & 7),
        (this.f_spVisibility = (e >> 4) & 1),
        (this.f_bgVisibility = (e >> 3) & 1),
        (this.f_spClipping = (e >> 2) & 1),
        (this.f_bgClipping = (e >> 1) & 1),
        (this.f_dispType = e & 1),
        this.f_dispType === 0 && this.palTable.setEmphasis(this.f_color),
        this.updatePalettes();
    },
    setStatusFlag: function (e, i) {
      var r = 1 << e;
      this.nes.cpu.mem[8194] =
        (this.nes.cpu.mem[8194] & (255 - r)) | (i ? r : 0);
    },
    // CPU Register $2002:
    // Read the Status Register.
    readStatusRegister: function () {
      var e = this.nes.cpu.mem[8194];
      return (
        (this.firstWrite = !0), this.setStatusFlag(this.STATUS_VBLANK, !1), e
      );
    },
    // CPU Register $2003:
    // Write the SPR-RAM address that is used for sramWrite (Register 0x2004 in CPU memory map)
    writeSRAMAddress: function (e) {
      this.sramAddress = e;
    },
    // CPU Register $2004 (R):
    // Read from SPR-RAM (Sprite RAM).
    // The address should be set first.
    sramLoad: function () {
      return this.spriteMem[this.sramAddress];
    },
    // CPU Register $2004 (W):
    // Write to SPR-RAM (Sprite RAM).
    // The address should be set first.
    sramWrite: function (e) {
      (this.spriteMem[this.sramAddress] = e),
        this.spriteRamWriteUpdate(this.sramAddress, e),
        this.sramAddress++,
        (this.sramAddress %= 256);
    },
    // CPU Register $2005:
    // Write to scroll registers.
    // The first write is the vertical offset, the second is the
    // horizontal offset:
    scrollWrite: function (e) {
      this.triggerRendering(),
        this.firstWrite
          ? ((this.regHT = (e >> 3) & 31), (this.regFH = e & 7))
          : ((this.regFV = e & 7), (this.regVT = (e >> 3) & 31)),
        (this.firstWrite = !this.firstWrite);
    },
    // CPU Register $2006:
    // Sets the adress used when reading/writing from/to VRAM.
    // The first write sets the high byte, the second the low byte.
    writeVRAMAddress: function (e) {
      this.firstWrite
        ? ((this.regFV = (e >> 4) & 3),
          (this.regV = (e >> 3) & 1),
          (this.regH = (e >> 2) & 1),
          (this.regVT = (this.regVT & 7) | ((e & 3) << 3)))
        : (this.triggerRendering(),
          (this.regVT = (this.regVT & 24) | ((e >> 5) & 7)),
          (this.regHT = e & 31),
          (this.cntFV = this.regFV),
          (this.cntV = this.regV),
          (this.cntH = this.regH),
          (this.cntVT = this.regVT),
          (this.cntHT = this.regHT),
          this.checkSprite0(this.scanline - 20)),
        (this.firstWrite = !this.firstWrite),
        this.cntsToAddress(),
        this.vramAddress < 8192 && this.nes.mmap.latchAccess(this.vramAddress);
    },
    // CPU Register $2007(R):
    // Read from PPU memory. The address should be set first.
    vramLoad: function () {
      var e;
      return (
        this.cntsToAddress(),
        this.regsToAddress(),
        this.vramAddress <= 16127
          ? ((e = this.vramBufferedReadValue),
            this.vramAddress < 8192
              ? (this.vramBufferedReadValue = this.vramMem[this.vramAddress])
              : (this.vramBufferedReadValue = this.mirroredLoad(
                  this.vramAddress
                )),
            this.vramAddress < 8192 &&
              this.nes.mmap.latchAccess(this.vramAddress),
            (this.vramAddress += this.f_addrInc === 1 ? 32 : 1),
            this.cntsFromAddress(),
            this.regsFromAddress(),
            e)
          : ((e = this.mirroredLoad(this.vramAddress)),
            (this.vramAddress += this.f_addrInc === 1 ? 32 : 1),
            this.cntsFromAddress(),
            this.regsFromAddress(),
            e)
      );
    },
    // CPU Register $2007(W):
    // Write to PPU memory. The address should be set first.
    vramWrite: function (e) {
      this.triggerRendering(),
        this.cntsToAddress(),
        this.regsToAddress(),
        this.vramAddress >= 8192
          ? this.mirroredWrite(this.vramAddress, e)
          : (this.writeMem(this.vramAddress, e),
            this.nes.mmap.latchAccess(this.vramAddress)),
        (this.vramAddress += this.f_addrInc === 1 ? 32 : 1),
        this.regsFromAddress(),
        this.cntsFromAddress();
    },
    // CPU Register $4014:
    // Write 256 bytes of main memory
    // into Sprite RAM.
    sramDMA: function (e) {
      for (var i = e * 256, r, n = this.sramAddress; n < 256; n++)
        (r = this.nes.cpu.mem[i + n]),
          (this.spriteMem[n] = r),
          this.spriteRamWriteUpdate(n, r);
      this.nes.cpu.haltCycles(513);
    },
    // Updates the scroll registers from a new VRAM address.
    regsFromAddress: function () {
      var e = (this.vramTmpAddress >> 8) & 255;
      (this.regFV = (e >> 4) & 7),
        (this.regV = (e >> 3) & 1),
        (this.regH = (e >> 2) & 1),
        (this.regVT = (this.regVT & 7) | ((e & 3) << 3)),
        (e = this.vramTmpAddress & 255),
        (this.regVT = (this.regVT & 24) | ((e >> 5) & 7)),
        (this.regHT = e & 31);
    },
    // Updates the scroll registers from a new VRAM address.
    cntsFromAddress: function () {
      var e = (this.vramAddress >> 8) & 255;
      (this.cntFV = (e >> 4) & 3),
        (this.cntV = (e >> 3) & 1),
        (this.cntH = (e >> 2) & 1),
        (this.cntVT = (this.cntVT & 7) | ((e & 3) << 3)),
        (e = this.vramAddress & 255),
        (this.cntVT = (this.cntVT & 24) | ((e >> 5) & 7)),
        (this.cntHT = e & 31);
    },
    regsToAddress: function () {
      var e = (this.regFV & 7) << 4;
      (e |= (this.regV & 1) << 3),
        (e |= (this.regH & 1) << 2),
        (e |= (this.regVT >> 3) & 3);
      var i = (this.regVT & 7) << 5;
      (i |= this.regHT & 31), (this.vramTmpAddress = ((e << 8) | i) & 32767);
    },
    cntsToAddress: function () {
      var e = (this.cntFV & 7) << 4;
      (e |= (this.cntV & 1) << 3),
        (e |= (this.cntH & 1) << 2),
        (e |= (this.cntVT >> 3) & 3);
      var i = (this.cntVT & 7) << 5;
      (i |= this.cntHT & 31), (this.vramAddress = ((e << 8) | i) & 32767);
    },
    incTileCounter: function (e) {
      for (var i = e; i !== 0; i--)
        this.cntHT++,
          this.cntHT === 32 &&
            ((this.cntHT = 0),
            this.cntVT++,
            this.cntVT >= 30 &&
              (this.cntH++,
              this.cntH === 2 &&
                ((this.cntH = 0),
                this.cntV++,
                this.cntV === 2 &&
                  ((this.cntV = 0), this.cntFV++, (this.cntFV &= 7)))));
    },
    // Reads from memory, taking into account
    // mirroring/mapping of address ranges.
    mirroredLoad: function (e) {
      return this.vramMem[this.vramMirrorTable[e]];
    },
    // Writes to memory, taking into account
    // mirroring/mapping of address ranges.
    mirroredWrite: function (e, i) {
      if (e >= 16128 && e < 16160)
        e === 16128 || e === 16144
          ? (this.writeMem(16128, i), this.writeMem(16144, i))
          : e === 16132 || e === 16148
          ? (this.writeMem(16132, i), this.writeMem(16148, i))
          : e === 16136 || e === 16152
          ? (this.writeMem(16136, i), this.writeMem(16152, i))
          : e === 16140 || e === 16156
          ? (this.writeMem(16140, i), this.writeMem(16156, i))
          : this.writeMem(e, i);
      else if (e < this.vramMirrorTable.length)
        this.writeMem(this.vramMirrorTable[e], i);
      else throw new Error("Invalid VRAM address: " + e.toString(16));
    },
    triggerRendering: function () {
      this.scanline >= 21 &&
        this.scanline <= 260 &&
        (this.renderFramePartially(
          this.lastRenderedScanline + 1,
          this.scanline - 21 - this.lastRenderedScanline
        ),
        (this.lastRenderedScanline = this.scanline - 21));
    },
    renderFramePartially: function (e, i) {
      if (
        (this.f_spVisibility === 1 && this.renderSpritesPartially(e, i, !0),
        this.f_bgVisibility === 1)
      ) {
        var r = e << 8,
          n = (e + i) << 8;
        n > 61440 && (n = 61440);
        for (
          var u = this.buffer, l = this.bgbuffer, f = this.pixrendered, p = r;
          p < n;
          p++
        )
          f[p] > 255 && (u[p] = l[p]);
      }
      this.f_spVisibility === 1 && this.renderSpritesPartially(e, i, !1),
        (this.validTileData = !1);
    },
    renderBgScanline: function (e, i) {
      var r = this.regS === 0 ? 0 : 256,
        n = (i << 8) - this.regFH;
      if (
        ((this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH]),
        (this.cntHT = this.regHT),
        (this.cntH = this.regH),
        (this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH]),
        i < 240 && i - this.cntFV >= 0)
      ) {
        for (
          var u = this.cntFV << 3,
            l = this.scantile,
            f = this.attrib,
            p = this.ptTile,
            R = this.nameTable,
            b = this.imgPalette,
            N = this.pixrendered,
            A = e ? this.bgbuffer : this.buffer,
            g,
            M,
            S,
            P,
            E = 0;
          E < 32;
          E++
        ) {
          if (i >= 0) {
            if (this.validTileData) {
              if (((g = l[E]), typeof g > "u")) continue;
              (M = g.pix), (S = f[E]);
            } else {
              if (
                ((g =
                  p[r + R[this.curNt].getTileIndex(this.cntHT, this.cntVT)]),
                typeof g > "u")
              )
                continue;
              (M = g.pix),
                (S = R[this.curNt].getAttrib(this.cntHT, this.cntVT)),
                (l[E] = g),
                (f[E] = S);
            }
            var T = 0,
              v = (E << 3) - this.regFH;
            if (v > -8)
              if ((v < 0 && ((n -= v), (T = -v)), g.opaque[this.cntFV]))
                for (; T < 8; T++) (A[n] = b[M[u + T] + S]), (N[n] |= 256), n++;
              else
                for (; T < 8; T++)
                  (P = M[u + T]),
                    P !== 0 && ((A[n] = b[P + S]), (N[n] |= 256)),
                    n++;
          }
          ++this.cntHT === 32 &&
            ((this.cntHT = 0),
            this.cntH++,
            (this.cntH %= 2),
            (this.curNt = this.ntable1[(this.cntV << 1) + this.cntH]));
        }
        this.validTileData = !0;
      }
      this.cntFV++,
        this.cntFV === 8 &&
          ((this.cntFV = 0),
          this.cntVT++,
          this.cntVT === 30
            ? ((this.cntVT = 0),
              this.cntV++,
              (this.cntV %= 2),
              (this.curNt = this.ntable1[(this.cntV << 1) + this.cntH]))
            : this.cntVT === 32 && (this.cntVT = 0),
          (this.validTileData = !1));
    },
    renderSpritesPartially: function (e, i, r) {
      if (this.f_spVisibility === 1) {
        for (var n = 0; n < 64; n++)
          if (
            this.bgPriority[n] === r &&
            this.sprX[n] >= 0 &&
            this.sprX[n] < 256 &&
            this.sprY[n] + 8 >= e &&
            this.sprY[n] < e + i
          )
            if (this.f_spriteSize === 0)
              (this.srcy1 = 0),
                (this.srcy2 = 8),
                this.sprY[n] < e && (this.srcy1 = e - this.sprY[n] - 1),
                this.sprY[n] + 8 > e + i &&
                  (this.srcy2 = e + i - this.sprY[n] + 1),
                this.f_spPatternTable === 0
                  ? this.ptTile[this.sprTile[n]].render(
                      this.buffer,
                      0,
                      this.srcy1,
                      8,
                      this.srcy2,
                      this.sprX[n],
                      this.sprY[n] + 1,
                      this.sprCol[n],
                      this.sprPalette,
                      this.horiFlip[n],
                      this.vertFlip[n],
                      n,
                      this.pixrendered
                    )
                  : this.ptTile[this.sprTile[n] + 256].render(
                      this.buffer,
                      0,
                      this.srcy1,
                      8,
                      this.srcy2,
                      this.sprX[n],
                      this.sprY[n] + 1,
                      this.sprCol[n],
                      this.sprPalette,
                      this.horiFlip[n],
                      this.vertFlip[n],
                      n,
                      this.pixrendered
                    );
            else {
              var u = this.sprTile[n];
              u & 1 && (u = this.sprTile[n] - 1 + 256);
              var l = 0,
                f = 8;
              this.sprY[n] < e && (l = e - this.sprY[n] - 1),
                this.sprY[n] + 8 > e + i && (f = e + i - this.sprY[n]),
                this.ptTile[u + (this.vertFlip[n] ? 1 : 0)].render(
                  this.buffer,
                  0,
                  l,
                  8,
                  f,
                  this.sprX[n],
                  this.sprY[n] + 1,
                  this.sprCol[n],
                  this.sprPalette,
                  this.horiFlip[n],
                  this.vertFlip[n],
                  n,
                  this.pixrendered
                ),
                (l = 0),
                (f = 8),
                this.sprY[n] + 8 < e && (l = e - (this.sprY[n] + 8 + 1)),
                this.sprY[n] + 16 > e + i && (f = e + i - (this.sprY[n] + 8)),
                this.ptTile[u + (this.vertFlip[n] ? 0 : 1)].render(
                  this.buffer,
                  0,
                  l,
                  8,
                  f,
                  this.sprX[n],
                  this.sprY[n] + 1 + 8,
                  this.sprCol[n],
                  this.sprPalette,
                  this.horiFlip[n],
                  this.vertFlip[n],
                  n,
                  this.pixrendered
                );
            }
      }
    },
    checkSprite0: function (e) {
      (this.spr0HitX = -1), (this.spr0HitY = -1);
      var i,
        r = this.f_spPatternTable === 0 ? 0 : 256,
        n,
        u,
        l,
        f,
        p;
      if (
        ((n = this.sprX[0]), (u = this.sprY[0] + 1), this.f_spriteSize === 0)
      ) {
        if (u <= e && u + 8 > e && n >= -7 && n < 256)
          if (
            ((l = this.ptTile[this.sprTile[0] + r]),
            this.vertFlip[0] ? (i = 7 - (e - u)) : (i = e - u),
            (i *= 8),
            (p = e * 256 + n),
            this.horiFlip[0])
          )
            for (f = 7; f >= 0; f--) {
              if (
                n >= 0 &&
                n < 256 &&
                p >= 0 &&
                p < 61440 &&
                this.pixrendered[p] !== 0 &&
                l.pix[i + f] !== 0
              )
                return (this.spr0HitX = p % 256), (this.spr0HitY = e), !0;
              n++, p++;
            }
          else
            for (f = 0; f < 8; f++) {
              if (
                n >= 0 &&
                n < 256 &&
                p >= 0 &&
                p < 61440 &&
                this.pixrendered[p] !== 0 &&
                l.pix[i + f] !== 0
              )
                return (this.spr0HitX = p % 256), (this.spr0HitY = e), !0;
              n++, p++;
            }
      } else if (u <= e && u + 16 > e && n >= -7 && n < 256)
        if (
          (this.vertFlip[0] ? (i = 15 - (e - u)) : (i = e - u),
          i < 8
            ? (l =
                this.ptTile[
                  this.sprTile[0] +
                    (this.vertFlip[0] ? 1 : 0) +
                    (this.sprTile[0] & 1 ? 255 : 0)
                ])
            : ((l =
                this.ptTile[
                  this.sprTile[0] +
                    (this.vertFlip[0] ? 0 : 1) +
                    (this.sprTile[0] & 1 ? 255 : 0)
                ]),
              this.vertFlip[0] ? (i = 15 - i) : (i -= 8)),
          (i *= 8),
          (p = e * 256 + n),
          this.horiFlip[0])
        )
          for (f = 7; f >= 0; f--) {
            if (
              n >= 0 &&
              n < 256 &&
              p >= 0 &&
              p < 61440 &&
              this.pixrendered[p] !== 0 &&
              l.pix[i + f] !== 0
            )
              return (this.spr0HitX = p % 256), (this.spr0HitY = e), !0;
            n++, p++;
          }
        else
          for (f = 0; f < 8; f++) {
            if (
              n >= 0 &&
              n < 256 &&
              p >= 0 &&
              p < 61440 &&
              this.pixrendered[p] !== 0 &&
              l.pix[i + f] !== 0
            )
              return (this.spr0HitX = p % 256), (this.spr0HitY = e), !0;
            n++, p++;
          }
      return !1;
    },
    // This will write to PPU memory, and
    // update internally buffered data
    // appropriately.
    writeMem: function (e, i) {
      (this.vramMem[e] = i),
        e < 8192
          ? ((this.vramMem[e] = i), this.patternWrite(e, i))
          : e >= 8192 && e < 9152
          ? this.nameTableWrite(this.ntable1[0], e - 8192, i)
          : e >= 9152 && e < 9216
          ? this.attribTableWrite(this.ntable1[0], e - 9152, i)
          : e >= 9216 && e < 10176
          ? this.nameTableWrite(this.ntable1[1], e - 9216, i)
          : e >= 10176 && e < 10240
          ? this.attribTableWrite(this.ntable1[1], e - 10176, i)
          : e >= 10240 && e < 11200
          ? this.nameTableWrite(this.ntable1[2], e - 10240, i)
          : e >= 11200 && e < 11264
          ? this.attribTableWrite(this.ntable1[2], e - 11200, i)
          : e >= 11264 && e < 12224
          ? this.nameTableWrite(this.ntable1[3], e - 11264, i)
          : e >= 12224 && e < 12288
          ? this.attribTableWrite(this.ntable1[3], e - 12224, i)
          : e >= 16128 && e < 16160 && this.updatePalettes();
    },
    // Reads data from $3f00 to $f20
    // into the two buffered palettes.
    updatePalettes: function () {
      var e;
      for (e = 0; e < 16; e++)
        this.f_dispType === 0
          ? (this.imgPalette[e] = this.palTable.getEntry(
              this.vramMem[16128 + e] & 63
            ))
          : (this.imgPalette[e] = this.palTable.getEntry(
              this.vramMem[16128 + e] & 32
            ));
      for (e = 0; e < 16; e++)
        this.f_dispType === 0
          ? (this.sprPalette[e] = this.palTable.getEntry(
              this.vramMem[16144 + e] & 63
            ))
          : (this.sprPalette[e] = this.palTable.getEntry(
              this.vramMem[16144 + e] & 32
            ));
    },
    // Updates the internal pattern
    // table buffers with this new byte.
    // In vNES, there is a version of this with 4 arguments which isn't used.
    patternWrite: function (e, i) {
      var r = Math.floor(e / 16),
        n = e % 16;
      n < 8
        ? this.ptTile[r].setScanline(n, i, this.vramMem[e + 8])
        : this.ptTile[r].setScanline(n - 8, this.vramMem[e - 8], i);
    },
    // Updates the internal name table buffers
    // with this new byte.
    nameTableWrite: function (e, i, r) {
      (this.nameTable[e].tile[i] = r), this.checkSprite0(this.scanline - 20);
    },
    // Updates the internal pattern
    // table buffers with this new attribute
    // table byte.
    attribTableWrite: function (e, i, r) {
      this.nameTable[e].writeAttrib(i, r);
    },
    // Updates the internally buffered sprite
    // data with this new byte of info.
    spriteRamWriteUpdate: function (e, i) {
      var r = Math.floor(e / 4);
      r === 0 && this.checkSprite0(this.scanline - 20),
        e % 4 === 0
          ? (this.sprY[r] = i)
          : e % 4 === 1
          ? (this.sprTile[r] = i)
          : e % 4 === 2
          ? ((this.vertFlip[r] = (i & 128) !== 0),
            (this.horiFlip[r] = (i & 64) !== 0),
            (this.bgPriority[r] = (i & 32) !== 0),
            (this.sprCol[r] = (i & 3) << 2))
          : e % 4 === 3 && (this.sprX[r] = i);
    },
    doNMI: function () {
      this.setStatusFlag(this.STATUS_VBLANK, !0),
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NMI);
    },
    isPixelWhite: function (e, i) {
      return (
        this.triggerRendering(), this.nes.ppu.buffer[(i << 8) + e] === 16777215
      );
    },
    JSON_PROPERTIES: [
      // Memory
      "vramMem",
      "spriteMem",
      // Counters
      "cntFV",
      "cntV",
      "cntH",
      "cntVT",
      "cntHT",
      // Registers
      "regFV",
      "regV",
      "regH",
      "regVT",
      "regHT",
      "regFH",
      "regS",
      // VRAM addr
      "vramAddress",
      "vramTmpAddress",
      // Control/Status registers
      "f_nmiOnVblank",
      "f_spriteSize",
      "f_bgPatternTable",
      "f_spPatternTable",
      "f_addrInc",
      "f_nTblAddress",
      "f_color",
      "f_spVisibility",
      "f_bgVisibility",
      "f_spClipping",
      "f_bgClipping",
      "f_dispType",
      // VRAM I/O
      "vramBufferedReadValue",
      "firstWrite",
      // Mirroring
      "currentMirroring",
      "vramMirrorTable",
      "ntable1",
      // SPR-RAM I/O
      "sramAddress",
      // Sprites. Most sprite data is rebuilt from spriteMem
      "hitSpr0",
      // Palettes
      "sprPalette",
      "imgPalette",
      // Rendering progression
      "curX",
      "scanline",
      "lastRenderedScanline",
      "curNt",
      "scantile",
      // Used during rendering
      "attrib",
      "buffer",
      "bgbuffer",
      "pixrendered",
      // Misc
      "requestEndFrame",
      "nmiOk",
      "dummyCycleToggle",
      "nmiCounter",
      "validTileData",
      "scanlineAlreadyRendered",
    ],
    toJSON: function () {
      var e,
        i = h.toJSON(this);
      for (i.nameTable = [], e = 0; e < this.nameTable.length; e++)
        i.nameTable[e] = this.nameTable[e].toJSON();
      for (i.ptTile = [], e = 0; e < this.ptTile.length; e++)
        i.ptTile[e] = this.ptTile[e].toJSON();
      return i;
    },
    fromJSON: function (e) {
      var i;
      for (h.fromJSON(this, e), i = 0; i < this.nameTable.length; i++)
        this.nameTable[i].fromJSON(e.nameTable[i]);
      for (i = 0; i < this.ptTile.length; i++)
        this.ptTile[i].fromJSON(e.ptTile[i]);
      for (i = 0; i < this.spriteMem.length; i++)
        this.spriteRamWriteUpdate(i, this.spriteMem[i]);
    },
  };
  var t = function (e, i, r) {
    (this.width = e),
      (this.height = i),
      (this.name = r),
      (this.tile = new Array(e * i)),
      (this.attrib = new Array(e * i));
    for (var n = 0; n < e * i; n++) (this.tile[n] = 0), (this.attrib[n] = 0);
  };
  t.prototype = {
    getTileIndex: function (e, i) {
      return this.tile[i * this.width + e];
    },
    getAttrib: function (e, i) {
      return this.attrib[i * this.width + e];
    },
    writeAttrib: function (e, i) {
      for (
        var r = (e % 8) * 4, n = Math.floor(e / 8) * 4, u, l, f, p, R = 0;
        R < 2;
        R++
      )
        for (var b = 0; b < 2; b++) {
          u = (i >> (2 * (R * 2 + b))) & 3;
          for (var N = 0; N < 2; N++)
            for (var A = 0; A < 2; A++)
              (l = r + b * 2 + A),
                (f = n + R * 2 + N),
                (p = f * this.width + l),
                (this.attrib[p] = (u << 2) & 12);
        }
    },
    toJSON: function () {
      return {
        tile: this.tile,
        attrib: this.attrib,
      };
    },
    fromJSON: function (e) {
      (this.tile = e.tile), (this.attrib = e.attrib);
    },
  };
  var o = function () {
    (this.curTable = new Array(64)),
      (this.emphTable = new Array(8)),
      (this.currentEmph = -1);
  };
  return (
    (o.prototype = {
      reset: function () {
        this.setEmphasis(0);
      },
      loadNTSCPalette: function () {
        (this.curTable = [
          5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048,
          543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064,
          14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843,
          43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785,
          16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115,
          7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216,
          16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717,
          12122296, 16119980, 16777136, 16308472, 0, 0,
        ]),
          this.makeTables(),
          this.setEmphasis(0);
      },
      loadPALPalette: function () {
        (this.curTable = [
          5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048,
          543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064,
          14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843,
          43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785,
          16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115,
          7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216,
          16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717,
          12122296, 16119980, 16777136, 16308472, 0, 0,
        ]),
          this.makeTables(),
          this.setEmphasis(0);
      },
      makeTables: function () {
        for (var e, i, r, n, u, l, f, p, R = 0; R < 8; R++)
          for (
            l = 1,
              f = 1,
              p = 1,
              R & 1 && ((l = 0.75), (p = 0.75)),
              R & 2 && ((l = 0.75), (f = 0.75)),
              R & 4 && ((f = 0.75), (p = 0.75)),
              this.emphTable[R] = new Array(64),
              u = 0;
            u < 64;
            u++
          )
            (n = this.curTable[u]),
              (e = Math.floor(this.getRed(n) * l)),
              (i = Math.floor(this.getGreen(n) * f)),
              (r = Math.floor(this.getBlue(n) * p)),
              (this.emphTable[R][u] = this.getRgb(e, i, r));
      },
      setEmphasis: function (e) {
        if (e !== this.currentEmph) {
          this.currentEmph = e;
          for (var i = 0; i < 64; i++) this.curTable[i] = this.emphTable[e][i];
        }
      },
      getEntry: function (e) {
        return this.curTable[e];
      },
      getRed: function (e) {
        return (e >> 16) & 255;
      },
      getGreen: function (e) {
        return (e >> 8) & 255;
      },
      getBlue: function (e) {
        return e & 255;
      },
      getRgb: function (e, i, r) {
        return (e << 16) | (i << 8) | r;
      },
      loadDefaultPalette: function () {
        (this.curTable[0] = this.getRgb(117, 117, 117)),
          (this.curTable[1] = this.getRgb(39, 27, 143)),
          (this.curTable[2] = this.getRgb(0, 0, 171)),
          (this.curTable[3] = this.getRgb(71, 0, 159)),
          (this.curTable[4] = this.getRgb(143, 0, 119)),
          (this.curTable[5] = this.getRgb(171, 0, 19)),
          (this.curTable[6] = this.getRgb(167, 0, 0)),
          (this.curTable[7] = this.getRgb(127, 11, 0)),
          (this.curTable[8] = this.getRgb(67, 47, 0)),
          (this.curTable[9] = this.getRgb(0, 71, 0)),
          (this.curTable[10] = this.getRgb(0, 81, 0)),
          (this.curTable[11] = this.getRgb(0, 63, 23)),
          (this.curTable[12] = this.getRgb(27, 63, 95)),
          (this.curTable[13] = this.getRgb(0, 0, 0)),
          (this.curTable[14] = this.getRgb(0, 0, 0)),
          (this.curTable[15] = this.getRgb(0, 0, 0)),
          (this.curTable[16] = this.getRgb(188, 188, 188)),
          (this.curTable[17] = this.getRgb(0, 115, 239)),
          (this.curTable[18] = this.getRgb(35, 59, 239)),
          (this.curTable[19] = this.getRgb(131, 0, 243)),
          (this.curTable[20] = this.getRgb(191, 0, 191)),
          (this.curTable[21] = this.getRgb(231, 0, 91)),
          (this.curTable[22] = this.getRgb(219, 43, 0)),
          (this.curTable[23] = this.getRgb(203, 79, 15)),
          (this.curTable[24] = this.getRgb(139, 115, 0)),
          (this.curTable[25] = this.getRgb(0, 151, 0)),
          (this.curTable[26] = this.getRgb(0, 171, 0)),
          (this.curTable[27] = this.getRgb(0, 147, 59)),
          (this.curTable[28] = this.getRgb(0, 131, 139)),
          (this.curTable[29] = this.getRgb(0, 0, 0)),
          (this.curTable[30] = this.getRgb(0, 0, 0)),
          (this.curTable[31] = this.getRgb(0, 0, 0)),
          (this.curTable[32] = this.getRgb(255, 255, 255)),
          (this.curTable[33] = this.getRgb(63, 191, 255)),
          (this.curTable[34] = this.getRgb(95, 151, 255)),
          (this.curTable[35] = this.getRgb(167, 139, 253)),
          (this.curTable[36] = this.getRgb(247, 123, 255)),
          (this.curTable[37] = this.getRgb(255, 119, 183)),
          (this.curTable[38] = this.getRgb(255, 119, 99)),
          (this.curTable[39] = this.getRgb(255, 155, 59)),
          (this.curTable[40] = this.getRgb(243, 191, 63)),
          (this.curTable[41] = this.getRgb(131, 211, 19)),
          (this.curTable[42] = this.getRgb(79, 223, 75)),
          (this.curTable[43] = this.getRgb(88, 248, 152)),
          (this.curTable[44] = this.getRgb(0, 235, 219)),
          (this.curTable[45] = this.getRgb(0, 0, 0)),
          (this.curTable[46] = this.getRgb(0, 0, 0)),
          (this.curTable[47] = this.getRgb(0, 0, 0)),
          (this.curTable[48] = this.getRgb(255, 255, 255)),
          (this.curTable[49] = this.getRgb(171, 231, 255)),
          (this.curTable[50] = this.getRgb(199, 215, 255)),
          (this.curTable[51] = this.getRgb(215, 203, 255)),
          (this.curTable[52] = this.getRgb(255, 199, 255)),
          (this.curTable[53] = this.getRgb(255, 199, 219)),
          (this.curTable[54] = this.getRgb(255, 191, 179)),
          (this.curTable[55] = this.getRgb(255, 219, 171)),
          (this.curTable[56] = this.getRgb(255, 231, 163)),
          (this.curTable[57] = this.getRgb(227, 255, 163)),
          (this.curTable[58] = this.getRgb(171, 243, 191)),
          (this.curTable[59] = this.getRgb(179, 255, 207)),
          (this.curTable[60] = this.getRgb(159, 255, 243)),
          (this.curTable[61] = this.getRgb(0, 0, 0)),
          (this.curTable[62] = this.getRgb(0, 0, 0)),
          (this.curTable[63] = this.getRgb(0, 0, 0)),
          this.makeTables(),
          this.setEmphasis(0);
      },
    }),
    (ut = s),
    ut
  );
}
var pt, Bt;
function Ui() {
  if (Bt) return pt;
  Bt = 1;
  var a = 17897725e-1,
    h = function (i) {
      (this.nes = i),
        (this.square1 = new o(this, !0)),
        (this.square2 = new o(this, !1)),
        (this.triangle = new e(this)),
        (this.noise = new t(this)),
        (this.dmc = new s(this)),
        (this.frameIrqCounter = null),
        (this.frameIrqCounterMax = 4),
        (this.initCounter = 2048),
        (this.channelEnableValue = null),
        (this.sampleRate = 44100),
        (this.lengthLookup = null),
        (this.dmcFreqLookup = null),
        (this.noiseWavelengthLookup = null),
        (this.square_table = null),
        (this.tnd_table = null),
        (this.frameIrqEnabled = !1),
        (this.frameIrqActive = null),
        (this.frameClockNow = null),
        (this.startedPlaying = !1),
        (this.recordOutput = !1),
        (this.initingHardware = !1),
        (this.masterFrameCounter = null),
        (this.derivedFrameCounter = null),
        (this.countSequence = null),
        (this.sampleTimer = null),
        (this.frameTime = null),
        (this.sampleTimerMax = null),
        (this.sampleCount = null),
        (this.triValue = 0),
        (this.smpSquare1 = null),
        (this.smpSquare2 = null),
        (this.smpTriangle = null),
        (this.smpDmc = null),
        (this.accCount = null),
        (this.prevSampleL = 0),
        (this.prevSampleR = 0),
        (this.smpAccumL = 0),
        (this.smpAccumR = 0),
        (this.dacRange = 0),
        (this.dcValue = 0),
        (this.masterVolume = 256),
        (this.stereoPosLSquare1 = null),
        (this.stereoPosLSquare2 = null),
        (this.stereoPosLTriangle = null),
        (this.stereoPosLNoise = null),
        (this.stereoPosLDMC = null),
        (this.stereoPosRSquare1 = null),
        (this.stereoPosRSquare2 = null),
        (this.stereoPosRTriangle = null),
        (this.stereoPosRNoise = null),
        (this.stereoPosRDMC = null),
        (this.extraCycles = null),
        (this.maxSample = null),
        (this.minSample = null),
        (this.panning = [80, 170, 100, 150, 128]),
        this.setPanning(this.panning),
        this.initLengthLookup(),
        this.initDmcFrequencyLookup(),
        this.initNoiseWavelengthLookup(),
        this.initDACtables();
      for (var r = 0; r < 20; r++)
        r === 16 ? this.writeReg(16400, 16) : this.writeReg(16384 + r, 0);
      this.reset();
    };
  h.prototype = {
    reset: function () {
      (this.sampleRate = this.nes.opts.sampleRate),
        (this.sampleTimerMax = Math.floor(
          (1024 * a * this.nes.opts.preferredFrameRate) / (this.sampleRate * 60)
        )),
        (this.frameTime = Math.floor(
          (14915 * this.nes.opts.preferredFrameRate) / 60
        )),
        (this.sampleTimer = 0),
        this.updateChannelEnable(0),
        (this.masterFrameCounter = 0),
        (this.derivedFrameCounter = 0),
        (this.countSequence = 0),
        (this.sampleCount = 0),
        (this.initCounter = 2048),
        (this.frameIrqEnabled = !1),
        (this.initingHardware = !1),
        this.resetCounter(),
        this.square1.reset(),
        this.square2.reset(),
        this.triangle.reset(),
        this.noise.reset(),
        this.dmc.reset(),
        (this.accCount = 0),
        (this.smpSquare1 = 0),
        (this.smpSquare2 = 0),
        (this.smpTriangle = 0),
        (this.smpDmc = 0),
        (this.frameIrqEnabled = !1),
        (this.frameIrqCounterMax = 4),
        (this.channelEnableValue = 255),
        (this.startedPlaying = !1),
        (this.prevSampleL = 0),
        (this.prevSampleR = 0),
        (this.smpAccumL = 0),
        (this.smpAccumR = 0),
        (this.maxSample = -5e5),
        (this.minSample = 5e5);
    },
    // eslint-disable-next-line no-unused-vars
    readReg: function (i) {
      var r = 0;
      return (
        (r |= this.square1.getLengthStatus()),
        (r |= this.square2.getLengthStatus() << 1),
        (r |= this.triangle.getLengthStatus() << 2),
        (r |= this.noise.getLengthStatus() << 3),
        (r |= this.dmc.getLengthStatus() << 4),
        (r |= (this.frameIrqActive && this.frameIrqEnabled ? 1 : 0) << 6),
        (r |= this.dmc.getIrqStatus() << 7),
        (this.frameIrqActive = !1),
        (this.dmc.irqGenerated = !1),
        r & 65535
      );
    },
    writeReg: function (i, r) {
      i >= 16384 && i < 16388
        ? this.square1.writeReg(i, r)
        : i >= 16388 && i < 16392
        ? this.square2.writeReg(i, r)
        : i >= 16392 && i < 16396
        ? this.triangle.writeReg(i, r)
        : i >= 16396 && i <= 16399
        ? this.noise.writeReg(i, r)
        : i === 16400
        ? this.dmc.writeReg(i, r)
        : i === 16401
        ? this.dmc.writeReg(i, r)
        : i === 16402
        ? this.dmc.writeReg(i, r)
        : i === 16403
        ? this.dmc.writeReg(i, r)
        : i === 16405
        ? (this.updateChannelEnable(r),
          r !== 0 && this.initCounter > 0 && (this.initingHardware = !0),
          this.dmc.writeReg(i, r))
        : i === 16407 &&
          ((this.countSequence = (r >> 7) & 1),
          (this.masterFrameCounter = 0),
          (this.frameIrqActive = !1),
          (r >> 6) & 1
            ? (this.frameIrqEnabled = !1)
            : (this.frameIrqEnabled = !0),
          this.countSequence === 0
            ? ((this.frameIrqCounterMax = 4), (this.derivedFrameCounter = 4))
            : ((this.frameIrqCounterMax = 5),
              (this.derivedFrameCounter = 0),
              this.frameCounterTick()));
    },
    resetCounter: function () {
      this.countSequence === 0
        ? (this.derivedFrameCounter = 4)
        : (this.derivedFrameCounter = 0);
    },
    // Updates channel enable status.
    // This is done on writes to the
    // channel enable register (0x4015),
    // and when the user enables/disables channels
    // in the GUI.
    updateChannelEnable: function (i) {
      (this.channelEnableValue = i & 65535),
        this.square1.setEnabled((i & 1) !== 0),
        this.square2.setEnabled((i & 2) !== 0),
        this.triangle.setEnabled((i & 4) !== 0),
        this.noise.setEnabled((i & 8) !== 0),
        this.dmc.setEnabled((i & 16) !== 0);
    },
    // Clocks the frame counter. It should be clocked at
    // twice the cpu speed, so the cycles will be
    // divided by 2 for those counters that are
    // clocked at cpu speed.
    clockFrameCounter: function (i) {
      if (this.initCounter > 0 && this.initingHardware) {
        (this.initCounter -= i),
          this.initCounter <= 0 && (this.initingHardware = !1);
        return;
      }
      i += this.extraCycles;
      var r = this.sampleTimerMax - this.sampleTimer;
      i << 10 > r
        ? ((this.extraCycles = ((i << 10) - r) >> 10), (i -= this.extraCycles))
        : (this.extraCycles = 0);
      var n = this.dmc,
        u = this.triangle,
        l = this.square1,
        f = this.square2,
        p = this.noise;
      if (n.isEnabled)
        for (
          n.shiftCounter -= i << 3;
          n.shiftCounter <= 0 && n.dmaFrequency > 0;

        )
          (n.shiftCounter += n.dmaFrequency), n.clockDmc();
      if (u.progTimerMax > 0)
        for (u.progTimerCount -= i; u.progTimerCount <= 0; )
          (u.progTimerCount += u.progTimerMax + 1),
            u.linearCounter > 0 &&
              u.lengthCounter > 0 &&
              (u.triangleCounter++,
              (u.triangleCounter &= 31),
              u.isEnabled &&
                (u.triangleCounter >= 16
                  ? (u.sampleValue = u.triangleCounter & 15)
                  : (u.sampleValue = 15 - (u.triangleCounter & 15)),
                (u.sampleValue <<= 4)));
      (l.progTimerCount -= i),
        l.progTimerCount <= 0 &&
          ((l.progTimerCount += (l.progTimerMax + 1) << 1),
          l.squareCounter++,
          (l.squareCounter &= 7),
          l.updateSampleValue()),
        (f.progTimerCount -= i),
        f.progTimerCount <= 0 &&
          ((f.progTimerCount += (f.progTimerMax + 1) << 1),
          f.squareCounter++,
          (f.squareCounter &= 7),
          f.updateSampleValue());
      var R = i;
      if (p.progTimerCount - R > 0)
        (p.progTimerCount -= R),
          (p.accCount += R),
          (p.accValue += R * p.sampleValue);
      else
        for (; R-- > 0; )
          --p.progTimerCount <= 0 &&
            p.progTimerMax > 0 &&
            ((p.shiftReg <<= 1),
            (p.tmp =
              ((p.shiftReg << (p.randomMode === 0 ? 1 : 6)) ^ p.shiftReg) &
              32768),
            p.tmp !== 0
              ? ((p.shiftReg |= 1), (p.randomBit = 0), (p.sampleValue = 0))
              : ((p.randomBit = 1),
                p.isEnabled && p.lengthCounter > 0
                  ? (p.sampleValue = p.masterVolume)
                  : (p.sampleValue = 0)),
            (p.progTimerCount += p.progTimerMax)),
            (p.accValue += p.sampleValue),
            p.accCount++;
      this.frameIrqEnabled &&
        this.frameIrqActive &&
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL),
        (this.masterFrameCounter += i << 1),
        this.masterFrameCounter >= this.frameTime &&
          ((this.masterFrameCounter -= this.frameTime),
          this.frameCounterTick()),
        this.accSample(i),
        (this.sampleTimer += i << 10),
        this.sampleTimer >= this.sampleTimerMax &&
          (this.sample(), (this.sampleTimer -= this.sampleTimerMax));
    },
    accSample: function (i) {
      this.triangle.sampleCondition &&
        ((this.triValue = Math.floor(
          (this.triangle.progTimerCount << 4) / (this.triangle.progTimerMax + 1)
        )),
        this.triValue > 16 && (this.triValue = 16),
        this.triangle.triangleCounter >= 16 &&
          (this.triValue = 16 - this.triValue),
        (this.triValue += this.triangle.sampleValue)),
        i === 2
          ? ((this.smpTriangle += this.triValue << 1),
            (this.smpDmc += this.dmc.sample << 1),
            (this.smpSquare1 += this.square1.sampleValue << 1),
            (this.smpSquare2 += this.square2.sampleValue << 1),
            (this.accCount += 2))
          : i === 4
          ? ((this.smpTriangle += this.triValue << 2),
            (this.smpDmc += this.dmc.sample << 2),
            (this.smpSquare1 += this.square1.sampleValue << 2),
            (this.smpSquare2 += this.square2.sampleValue << 2),
            (this.accCount += 4))
          : ((this.smpTriangle += i * this.triValue),
            (this.smpDmc += i * this.dmc.sample),
            (this.smpSquare1 += i * this.square1.sampleValue),
            (this.smpSquare2 += i * this.square2.sampleValue),
            (this.accCount += i));
    },
    frameCounterTick: function () {
      this.derivedFrameCounter++,
        this.derivedFrameCounter >= this.frameIrqCounterMax &&
          (this.derivedFrameCounter = 0),
        (this.derivedFrameCounter === 1 || this.derivedFrameCounter === 3) &&
          (this.triangle.clockLengthCounter(),
          this.square1.clockLengthCounter(),
          this.square2.clockLengthCounter(),
          this.noise.clockLengthCounter(),
          this.square1.clockSweep(),
          this.square2.clockSweep()),
        this.derivedFrameCounter >= 0 &&
          this.derivedFrameCounter < 4 &&
          (this.square1.clockEnvDecay(),
          this.square2.clockEnvDecay(),
          this.noise.clockEnvDecay(),
          this.triangle.clockLinearCounter()),
        this.derivedFrameCounter === 3 &&
          this.countSequence === 0 &&
          (this.frameIrqActive = !0);
    },
    // Samples the channels, mixes the output together, then writes to buffer.
    sample: function () {
      var i, r;
      this.accCount > 0
        ? ((this.smpSquare1 <<= 4),
          (this.smpSquare1 = Math.floor(this.smpSquare1 / this.accCount)),
          (this.smpSquare2 <<= 4),
          (this.smpSquare2 = Math.floor(this.smpSquare2 / this.accCount)),
          (this.smpTriangle = Math.floor(this.smpTriangle / this.accCount)),
          (this.smpDmc <<= 4),
          (this.smpDmc = Math.floor(this.smpDmc / this.accCount)),
          (this.accCount = 0))
        : ((this.smpSquare1 = this.square1.sampleValue << 4),
          (this.smpSquare2 = this.square2.sampleValue << 4),
          (this.smpTriangle = this.triangle.sampleValue),
          (this.smpDmc = this.dmc.sample << 4));
      var n = Math.floor((this.noise.accValue << 4) / this.noise.accCount);
      (this.noise.accValue = n >> 4),
        (this.noise.accCount = 1),
        (i =
          (this.smpSquare1 * this.stereoPosLSquare1 +
            this.smpSquare2 * this.stereoPosLSquare2) >>
          8),
        (r =
          (3 * this.smpTriangle * this.stereoPosLTriangle +
            (n << 1) * this.stereoPosLNoise +
            this.smpDmc * this.stereoPosLDMC) >>
          8),
        i >= this.square_table.length && (i = this.square_table.length - 1),
        r >= this.tnd_table.length && (r = this.tnd_table.length - 1);
      var u = this.square_table[i] + this.tnd_table[r] - this.dcValue;
      (i =
        (this.smpSquare1 * this.stereoPosRSquare1 +
          this.smpSquare2 * this.stereoPosRSquare2) >>
        8),
        (r =
          (3 * this.smpTriangle * this.stereoPosRTriangle +
            (n << 1) * this.stereoPosRNoise +
            this.smpDmc * this.stereoPosRDMC) >>
          8),
        i >= this.square_table.length && (i = this.square_table.length - 1),
        r >= this.tnd_table.length && (r = this.tnd_table.length - 1);
      var l = this.square_table[i] + this.tnd_table[r] - this.dcValue,
        f = u - this.prevSampleL;
      (this.prevSampleL += f),
        (this.smpAccumL += f - (this.smpAccumL >> 10)),
        (u = this.smpAccumL);
      var p = l - this.prevSampleR;
      (this.prevSampleR += p),
        (this.smpAccumR += p - (this.smpAccumR >> 10)),
        (l = this.smpAccumR),
        u > this.maxSample && (this.maxSample = u),
        u < this.minSample && (this.minSample = u),
        this.nes.opts.onAudioSample &&
          this.nes.opts.onAudioSample(u / 32768, l / 32768),
        (this.smpSquare1 = 0),
        (this.smpSquare2 = 0),
        (this.smpTriangle = 0),
        (this.smpDmc = 0);
    },
    getLengthMax: function (i) {
      return this.lengthLookup[i >> 3];
    },
    getDmcFrequency: function (i) {
      return i >= 0 && i < 16 ? this.dmcFreqLookup[i] : 0;
    },
    getNoiseWaveLength: function (i) {
      return i >= 0 && i < 16 ? this.noiseWavelengthLookup[i] : 0;
    },
    setPanning: function (i) {
      for (var r = 0; r < 5; r++) this.panning[r] = i[r];
      this.updateStereoPos();
    },
    setMasterVolume: function (i) {
      i < 0 && (i = 0),
        i > 256 && (i = 256),
        (this.masterVolume = i),
        this.updateStereoPos();
    },
    updateStereoPos: function () {
      (this.stereoPosLSquare1 = (this.panning[0] * this.masterVolume) >> 8),
        (this.stereoPosLSquare2 = (this.panning[1] * this.masterVolume) >> 8),
        (this.stereoPosLTriangle = (this.panning[2] * this.masterVolume) >> 8),
        (this.stereoPosLNoise = (this.panning[3] * this.masterVolume) >> 8),
        (this.stereoPosLDMC = (this.panning[4] * this.masterVolume) >> 8),
        (this.stereoPosRSquare1 = this.masterVolume - this.stereoPosLSquare1),
        (this.stereoPosRSquare2 = this.masterVolume - this.stereoPosLSquare2),
        (this.stereoPosRTriangle = this.masterVolume - this.stereoPosLTriangle),
        (this.stereoPosRNoise = this.masterVolume - this.stereoPosLNoise),
        (this.stereoPosRDMC = this.masterVolume - this.stereoPosLDMC);
    },
    initLengthLookup: function () {
      this.lengthLookup = [
        10, 254, 20, 2, 40, 4, 80, 6, 160, 8, 60, 10, 14, 12, 26, 14, 12, 16,
        24, 18, 48, 20, 96, 22, 192, 24, 72, 26, 16, 28, 32, 30,
      ];
    },
    initDmcFrequencyLookup: function () {
      (this.dmcFreqLookup = new Array(16)),
        (this.dmcFreqLookup[0] = 3424),
        (this.dmcFreqLookup[1] = 3040),
        (this.dmcFreqLookup[2] = 2720),
        (this.dmcFreqLookup[3] = 2560),
        (this.dmcFreqLookup[4] = 2288),
        (this.dmcFreqLookup[5] = 2032),
        (this.dmcFreqLookup[6] = 1808),
        (this.dmcFreqLookup[7] = 1712),
        (this.dmcFreqLookup[8] = 1520),
        (this.dmcFreqLookup[9] = 1280),
        (this.dmcFreqLookup[10] = 1136),
        (this.dmcFreqLookup[11] = 1024),
        (this.dmcFreqLookup[12] = 848),
        (this.dmcFreqLookup[13] = 672),
        (this.dmcFreqLookup[14] = 576),
        (this.dmcFreqLookup[15] = 432);
    },
    initNoiseWavelengthLookup: function () {
      (this.noiseWavelengthLookup = new Array(16)),
        (this.noiseWavelengthLookup[0] = 4),
        (this.noiseWavelengthLookup[1] = 8),
        (this.noiseWavelengthLookup[2] = 16),
        (this.noiseWavelengthLookup[3] = 32),
        (this.noiseWavelengthLookup[4] = 64),
        (this.noiseWavelengthLookup[5] = 96),
        (this.noiseWavelengthLookup[6] = 128),
        (this.noiseWavelengthLookup[7] = 160),
        (this.noiseWavelengthLookup[8] = 202),
        (this.noiseWavelengthLookup[9] = 254),
        (this.noiseWavelengthLookup[10] = 380),
        (this.noiseWavelengthLookup[11] = 508),
        (this.noiseWavelengthLookup[12] = 762),
        (this.noiseWavelengthLookup[13] = 1016),
        (this.noiseWavelengthLookup[14] = 2034),
        (this.noiseWavelengthLookup[15] = 4068);
    },
    initDACtables: function () {
      var i,
        r,
        n,
        u = 0,
        l = 0;
      for (
        this.square_table = new Array(32 * 16),
          this.tnd_table = new Array(204 * 16),
          n = 0;
        n < 32 * 16;
        n++
      )
        (i = 95.52 / (8128 / (n / 16) + 100)),
          (i *= 0.98411),
          (i *= 5e4),
          (r = Math.floor(i)),
          (this.square_table[n] = r),
          r > u && (u = r);
      for (n = 0; n < 204 * 16; n++)
        (i = 163.67 / (24329 / (n / 16) + 100)),
          (i *= 0.98411),
          (i *= 5e4),
          (r = Math.floor(i)),
          (this.tnd_table[n] = r),
          r > l && (l = r);
      (this.dacRange = u + l), (this.dcValue = this.dacRange / 2);
    },
  };
  var s = function (i) {
    (this.papu = i),
      (this.MODE_NORMAL = 0),
      (this.MODE_LOOP = 1),
      (this.MODE_IRQ = 2),
      (this.isEnabled = null),
      (this.hasSample = null),
      (this.irqGenerated = !1),
      (this.playMode = null),
      (this.dmaFrequency = null),
      (this.dmaCounter = null),
      (this.deltaCounter = null),
      (this.playStartAddress = null),
      (this.playAddress = null),
      (this.playLength = null),
      (this.playLengthCounter = null),
      (this.shiftCounter = null),
      (this.reg4012 = null),
      (this.reg4013 = null),
      (this.sample = null),
      (this.dacLsb = null),
      (this.data = null),
      this.reset();
  };
  s.prototype = {
    clockDmc: function () {
      this.hasSample &&
        (this.data & 1
          ? this.deltaCounter < 63 && this.deltaCounter++
          : this.deltaCounter > 0 && this.deltaCounter--,
        (this.sample = this.isEnabled
          ? (this.deltaCounter << 1) + this.dacLsb
          : 0),
        (this.data >>= 1)),
        this.dmaCounter--,
        this.dmaCounter <= 0 &&
          ((this.hasSample = !1), this.endOfSample(), (this.dmaCounter = 8)),
        this.irqGenerated &&
          this.papu.nes.cpu.requestIrq(this.papu.nes.cpu.IRQ_NORMAL);
    },
    endOfSample: function () {
      this.playLengthCounter === 0 &&
        this.playMode === this.MODE_LOOP &&
        ((this.playAddress = this.playStartAddress),
        (this.playLengthCounter = this.playLength)),
        this.playLengthCounter > 0 &&
          (this.nextSample(),
          this.playLengthCounter === 0 &&
            this.playMode === this.MODE_IRQ &&
            (this.irqGenerated = !0));
    },
    nextSample: function () {
      (this.data = this.papu.nes.mmap.load(this.playAddress)),
        this.papu.nes.cpu.haltCycles(4),
        this.playLengthCounter--,
        this.playAddress++,
        this.playAddress > 65535 && (this.playAddress = 32768),
        (this.hasSample = !0);
    },
    writeReg: function (i, r) {
      i === 16400
        ? (r >> 6
            ? ((r >> 6) & 1) === 1
              ? (this.playMode = this.MODE_LOOP)
              : r >> 6 === 2 && (this.playMode = this.MODE_IRQ)
            : (this.playMode = this.MODE_NORMAL),
          r & 128 || (this.irqGenerated = !1),
          (this.dmaFrequency = this.papu.getDmcFrequency(r & 15)))
        : i === 16401
        ? ((this.deltaCounter = (r >> 1) & 63),
          (this.dacLsb = r & 1),
          (this.sample = (this.deltaCounter << 1) + this.dacLsb))
        : i === 16402
        ? ((this.playStartAddress = (r << 6) | 49152),
          (this.playAddress = this.playStartAddress),
          (this.reg4012 = r))
        : i === 16403
        ? ((this.playLength = (r << 4) + 1),
          (this.playLengthCounter = this.playLength),
          (this.reg4013 = r))
        : i === 16405 &&
          ((r >> 4) & 1
            ? ((this.playAddress = this.playStartAddress),
              (this.playLengthCounter = this.playLength))
            : (this.playLengthCounter = 0),
          (this.irqGenerated = !1));
    },
    setEnabled: function (i) {
      !this.isEnabled && i && (this.playLengthCounter = this.playLength),
        (this.isEnabled = i);
    },
    getLengthStatus: function () {
      return this.playLengthCounter === 0 || !this.isEnabled ? 0 : 1;
    },
    getIrqStatus: function () {
      return this.irqGenerated ? 1 : 0;
    },
    reset: function () {
      (this.isEnabled = !1),
        (this.irqGenerated = !1),
        (this.playMode = this.MODE_NORMAL),
        (this.dmaFrequency = 0),
        (this.dmaCounter = 0),
        (this.deltaCounter = 0),
        (this.playStartAddress = 0),
        (this.playAddress = 0),
        (this.playLength = 0),
        (this.playLengthCounter = 0),
        (this.sample = 0),
        (this.dacLsb = 0),
        (this.shiftCounter = 0),
        (this.reg4012 = 0),
        (this.reg4013 = 0),
        (this.data = 0);
    },
  };
  var t = function (i) {
    (this.papu = i),
      (this.isEnabled = null),
      (this.envDecayDisable = null),
      (this.envDecayLoopEnable = null),
      (this.lengthCounterEnable = null),
      (this.envReset = null),
      (this.shiftNow = null),
      (this.lengthCounter = null),
      (this.progTimerCount = null),
      (this.progTimerMax = null),
      (this.envDecayRate = null),
      (this.envDecayCounter = null),
      (this.envVolume = null),
      (this.masterVolume = null),
      (this.shiftReg = 16384),
      (this.randomBit = null),
      (this.randomMode = null),
      (this.sampleValue = null),
      (this.accValue = 0),
      (this.accCount = 1),
      (this.tmp = null),
      this.reset();
  };
  t.prototype = {
    reset: function () {
      (this.progTimerCount = 0),
        (this.progTimerMax = 0),
        (this.isEnabled = !1),
        (this.lengthCounter = 0),
        (this.lengthCounterEnable = !1),
        (this.envDecayDisable = !1),
        (this.envDecayLoopEnable = !1),
        (this.shiftNow = !1),
        (this.envDecayRate = 0),
        (this.envDecayCounter = 0),
        (this.envVolume = 0),
        (this.masterVolume = 0),
        (this.shiftReg = 1),
        (this.randomBit = 0),
        (this.randomMode = 0),
        (this.sampleValue = 0),
        (this.tmp = 0);
    },
    clockLengthCounter: function () {
      this.lengthCounterEnable &&
        this.lengthCounter > 0 &&
        (this.lengthCounter--,
        this.lengthCounter === 0 && this.updateSampleValue());
    },
    clockEnvDecay: function () {
      this.envReset
        ? ((this.envReset = !1),
          (this.envDecayCounter = this.envDecayRate + 1),
          (this.envVolume = 15))
        : --this.envDecayCounter <= 0 &&
          ((this.envDecayCounter = this.envDecayRate + 1),
          this.envVolume > 0
            ? this.envVolume--
            : (this.envVolume = this.envDecayLoopEnable ? 15 : 0)),
        this.envDecayDisable
          ? (this.masterVolume = this.envDecayRate)
          : (this.masterVolume = this.envVolume),
        this.updateSampleValue();
    },
    updateSampleValue: function () {
      this.isEnabled &&
        this.lengthCounter > 0 &&
        (this.sampleValue = this.randomBit * this.masterVolume);
    },
    writeReg: function (i, r) {
      i === 16396
        ? ((this.envDecayDisable = (r & 16) !== 0),
          (this.envDecayRate = r & 15),
          (this.envDecayLoopEnable = (r & 32) !== 0),
          (this.lengthCounterEnable = (r & 32) === 0),
          this.envDecayDisable
            ? (this.masterVolume = this.envDecayRate)
            : (this.masterVolume = this.envVolume))
        : i === 16398
        ? ((this.progTimerMax = this.papu.getNoiseWaveLength(r & 15)),
          (this.randomMode = r >> 7))
        : i === 16399 &&
          ((this.lengthCounter = this.papu.getLengthMax(r & 248)),
          (this.envReset = !0));
    },
    setEnabled: function (i) {
      (this.isEnabled = i),
        i || (this.lengthCounter = 0),
        this.updateSampleValue();
    },
    getLengthStatus: function () {
      return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
    },
  };
  var o = function (i, r) {
    (this.papu = i),
      (this.dutyLookup = [
        0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
        1, 0, 0, 1, 1, 1, 1, 1,
      ]),
      (this.impLookup = [
        1, -1, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0,
        0, -1, 0, 1, 0, 0, 0, 0, 0,
      ]),
      (this.sqr1 = r),
      (this.isEnabled = null),
      (this.lengthCounterEnable = null),
      (this.sweepActive = null),
      (this.envDecayDisable = null),
      (this.envDecayLoopEnable = null),
      (this.envReset = null),
      (this.sweepCarry = null),
      (this.updateSweepPeriod = null),
      (this.progTimerCount = null),
      (this.progTimerMax = null),
      (this.lengthCounter = null),
      (this.squareCounter = null),
      (this.sweepCounter = null),
      (this.sweepCounterMax = null),
      (this.sweepMode = null),
      (this.sweepShiftAmount = null),
      (this.envDecayRate = null),
      (this.envDecayCounter = null),
      (this.envVolume = null),
      (this.masterVolume = null),
      (this.dutyMode = null),
      (this.sweepResult = null),
      (this.sampleValue = null),
      (this.vol = null),
      this.reset();
  };
  o.prototype = {
    reset: function () {
      (this.progTimerCount = 0),
        (this.progTimerMax = 0),
        (this.lengthCounter = 0),
        (this.squareCounter = 0),
        (this.sweepCounter = 0),
        (this.sweepCounterMax = 0),
        (this.sweepMode = 0),
        (this.sweepShiftAmount = 0),
        (this.envDecayRate = 0),
        (this.envDecayCounter = 0),
        (this.envVolume = 0),
        (this.masterVolume = 0),
        (this.dutyMode = 0),
        (this.vol = 0),
        (this.isEnabled = !1),
        (this.lengthCounterEnable = !1),
        (this.sweepActive = !1),
        (this.sweepCarry = !1),
        (this.envDecayDisable = !1),
        (this.envDecayLoopEnable = !1);
    },
    clockLengthCounter: function () {
      this.lengthCounterEnable &&
        this.lengthCounter > 0 &&
        (this.lengthCounter--,
        this.lengthCounter === 0 && this.updateSampleValue());
    },
    clockEnvDecay: function () {
      this.envReset
        ? ((this.envReset = !1),
          (this.envDecayCounter = this.envDecayRate + 1),
          (this.envVolume = 15))
        : --this.envDecayCounter <= 0 &&
          ((this.envDecayCounter = this.envDecayRate + 1),
          this.envVolume > 0
            ? this.envVolume--
            : (this.envVolume = this.envDecayLoopEnable ? 15 : 0)),
        this.envDecayDisable
          ? (this.masterVolume = this.envDecayRate)
          : (this.masterVolume = this.envVolume),
        this.updateSampleValue();
    },
    clockSweep: function () {
      --this.sweepCounter <= 0 &&
        ((this.sweepCounter = this.sweepCounterMax + 1),
        this.sweepActive &&
          this.sweepShiftAmount > 0 &&
          this.progTimerMax > 7 &&
          ((this.sweepCarry = !1),
          this.sweepMode === 0
            ? ((this.progTimerMax +=
                this.progTimerMax >> this.sweepShiftAmount),
              this.progTimerMax > 4095 &&
                ((this.progTimerMax = 4095), (this.sweepCarry = !0)))
            : (this.progTimerMax =
                this.progTimerMax -
                ((this.progTimerMax >> this.sweepShiftAmount) -
                  (this.sqr1 ? 1 : 0))))),
        this.updateSweepPeriod &&
          ((this.updateSweepPeriod = !1),
          (this.sweepCounter = this.sweepCounterMax + 1));
    },
    updateSampleValue: function () {
      this.isEnabled && this.lengthCounter > 0 && this.progTimerMax > 7
        ? this.sweepMode === 0 &&
          this.progTimerMax + (this.progTimerMax >> this.sweepShiftAmount) >
            4095
          ? (this.sampleValue = 0)
          : (this.sampleValue =
              this.masterVolume *
              this.dutyLookup[(this.dutyMode << 3) + this.squareCounter])
        : (this.sampleValue = 0);
    },
    writeReg: function (i, r) {
      var n = this.sqr1 ? 0 : 4;
      i === 16384 + n
        ? ((this.envDecayDisable = (r & 16) !== 0),
          (this.envDecayRate = r & 15),
          (this.envDecayLoopEnable = (r & 32) !== 0),
          (this.dutyMode = (r >> 6) & 3),
          (this.lengthCounterEnable = (r & 32) === 0),
          this.envDecayDisable
            ? (this.masterVolume = this.envDecayRate)
            : (this.masterVolume = this.envVolume),
          this.updateSampleValue())
        : i === 16385 + n
        ? ((this.sweepActive = (r & 128) !== 0),
          (this.sweepCounterMax = (r >> 4) & 7),
          (this.sweepMode = (r >> 3) & 1),
          (this.sweepShiftAmount = r & 7),
          (this.updateSweepPeriod = !0))
        : i === 16386 + n
        ? ((this.progTimerMax &= 1792), (this.progTimerMax |= r))
        : i === 16387 + n &&
          ((this.progTimerMax &= 255),
          (this.progTimerMax |= (r & 7) << 8),
          this.isEnabled &&
            (this.lengthCounter = this.papu.getLengthMax(r & 248)),
          (this.envReset = !0));
    },
    setEnabled: function (i) {
      (this.isEnabled = i),
        i || (this.lengthCounter = 0),
        this.updateSampleValue();
    },
    getLengthStatus: function () {
      return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
    },
  };
  var e = function (i) {
    (this.papu = i),
      (this.isEnabled = null),
      (this.sampleCondition = null),
      (this.lengthCounterEnable = null),
      (this.lcHalt = null),
      (this.lcControl = null),
      (this.progTimerCount = null),
      (this.progTimerMax = null),
      (this.triangleCounter = null),
      (this.lengthCounter = null),
      (this.linearCounter = null),
      (this.lcLoadValue = null),
      (this.sampleValue = null),
      (this.tmp = null),
      this.reset();
  };
  return (
    (e.prototype = {
      reset: function () {
        (this.progTimerCount = 0),
          (this.progTimerMax = 0),
          (this.triangleCounter = 0),
          (this.isEnabled = !1),
          (this.sampleCondition = !1),
          (this.lengthCounter = 0),
          (this.lengthCounterEnable = !1),
          (this.linearCounter = 0),
          (this.lcLoadValue = 0),
          (this.lcHalt = !0),
          (this.lcControl = !1),
          (this.tmp = 0),
          (this.sampleValue = 15);
      },
      clockLengthCounter: function () {
        this.lengthCounterEnable &&
          this.lengthCounter > 0 &&
          (this.lengthCounter--,
          this.lengthCounter === 0 && this.updateSampleCondition());
      },
      clockLinearCounter: function () {
        this.lcHalt
          ? ((this.linearCounter = this.lcLoadValue),
            this.updateSampleCondition())
          : this.linearCounter > 0 &&
            (this.linearCounter--, this.updateSampleCondition()),
          this.lcControl || (this.lcHalt = !1);
      },
      getLengthStatus: function () {
        return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
      },
      // eslint-disable-next-line no-unused-vars
      readReg: function (i) {
        return 0;
      },
      writeReg: function (i, r) {
        i === 16392
          ? ((this.lcControl = (r & 128) !== 0),
            (this.lcLoadValue = r & 127),
            (this.lengthCounterEnable = !this.lcControl))
          : i === 16394
          ? ((this.progTimerMax &= 1792), (this.progTimerMax |= r))
          : i === 16395 &&
            ((this.progTimerMax &= 255),
            (this.progTimerMax |= (r & 7) << 8),
            (this.lengthCounter = this.papu.getLengthMax(r & 248)),
            (this.lcHalt = !0)),
          this.updateSampleCondition();
      },
      clockProgrammableTimer: function (i) {
        if (this.progTimerMax > 0)
          for (
            this.progTimerCount += i;
            this.progTimerMax > 0 && this.progTimerCount >= this.progTimerMax;

          )
            (this.progTimerCount -= this.progTimerMax),
              this.isEnabled &&
                this.lengthCounter > 0 &&
                this.linearCounter > 0 &&
                this.clockTriangleGenerator();
      },
      clockTriangleGenerator: function () {
        this.triangleCounter++, (this.triangleCounter &= 31);
      },
      setEnabled: function (i) {
        (this.isEnabled = i),
          i || (this.lengthCounter = 0),
          this.updateSampleCondition();
      },
      updateSampleCondition: function () {
        this.sampleCondition =
          this.isEnabled &&
          this.progTimerMax > 7 &&
          this.linearCounter > 0 &&
          this.lengthCounter > 0;
      },
    }),
    (pt = h),
    pt
  );
}
var ft, Vt;
function Zi() {
  if (Vt) return ft;
  Vt = 1;
  var a = At(),
    h = {};
  return (
    (h[0] = function (s) {
      this.nes = s;
    }),
    (h[0].prototype = {
      reset: function () {
        (this.joy1StrobeState = 0),
          (this.joy2StrobeState = 0),
          (this.joypadLastWrite = 0),
          (this.zapperFired = !1),
          (this.zapperX = null),
          (this.zapperY = null);
      },
      write: function (s, t) {
        s < 8192
          ? (this.nes.cpu.mem[s & 2047] = t)
          : s > 16407
          ? ((this.nes.cpu.mem[s] = t),
            s >= 24576 && s < 32768 && this.nes.opts.onBatteryRamWrite(s, t))
          : s > 8199 && s < 16384
          ? this.regWrite(8192 + (s & 7), t)
          : this.regWrite(s, t);
      },
      writelow: function (s, t) {
        s < 8192
          ? (this.nes.cpu.mem[s & 2047] = t)
          : s > 16407
          ? (this.nes.cpu.mem[s] = t)
          : s > 8199 && s < 16384
          ? this.regWrite(8192 + (s & 7), t)
          : this.regWrite(s, t);
      },
      load: function (s) {
        return (
          (s &= 65535),
          s > 16407
            ? this.nes.cpu.mem[s]
            : s >= 8192
            ? this.regLoad(s)
            : this.nes.cpu.mem[s & 2047]
        );
      },
      regLoad: function (s) {
        switch (s >> 12) {
          case 0:
            break;
          case 1:
            break;
          case 2:
          // Fall through to case 3
          case 3:
            switch (s & 7) {
              case 0:
                return this.nes.cpu.mem[8192];
              case 1:
                return this.nes.cpu.mem[8193];
              case 2:
                return this.nes.ppu.readStatusRegister();
              case 3:
                return 0;
              case 4:
                return this.nes.ppu.sramLoad();
              case 5:
                return 0;
              case 6:
                return 0;
              case 7:
                return this.nes.ppu.vramLoad();
            }
            break;
          case 4:
            switch (s - 16405) {
              case 0:
                return this.nes.papu.readReg(s);
              case 1:
                return this.joy1Read();
              case 2:
                var t;
                return (
                  this.zapperX !== null &&
                  this.zapperY !== null &&
                  this.nes.ppu.isPixelWhite(this.zapperX, this.zapperY)
                    ? (t = 0)
                    : (t = 8),
                  this.zapperFired && (t |= 16),
                  (this.joy2Read() | t) & 65535
                );
            }
            break;
        }
        return 0;
      },
      regWrite: function (s, t) {
        switch (s) {
          case 8192:
            (this.nes.cpu.mem[s] = t), this.nes.ppu.updateControlReg1(t);
            break;
          case 8193:
            (this.nes.cpu.mem[s] = t), this.nes.ppu.updateControlReg2(t);
            break;
          case 8195:
            this.nes.ppu.writeSRAMAddress(t);
            break;
          case 8196:
            this.nes.ppu.sramWrite(t);
            break;
          case 8197:
            this.nes.ppu.scrollWrite(t);
            break;
          case 8198:
            this.nes.ppu.writeVRAMAddress(t);
            break;
          case 8199:
            this.nes.ppu.vramWrite(t);
            break;
          case 16404:
            this.nes.ppu.sramDMA(t);
            break;
          case 16405:
            this.nes.papu.writeReg(s, t);
            break;
          case 16406:
            !(t & 1) &&
              (this.joypadLastWrite & 1) === 1 &&
              ((this.joy1StrobeState = 0), (this.joy2StrobeState = 0)),
              (this.joypadLastWrite = t);
            break;
          case 16407:
            this.nes.papu.writeReg(s, t);
            break;
          default:
            s >= 16384 && s <= 16407 && this.nes.papu.writeReg(s, t);
        }
      },
      joy1Read: function () {
        var s;
        switch (this.joy1StrobeState) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            s = this.nes.controllers[1].state[this.joy1StrobeState];
            break;
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
            s = 0;
            break;
          case 19:
            s = 1;
            break;
          default:
            s = 0;
        }
        return (
          this.joy1StrobeState++,
          this.joy1StrobeState === 24 && (this.joy1StrobeState = 0),
          s
        );
      },
      joy2Read: function () {
        var s;
        switch (this.joy2StrobeState) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            s = this.nes.controllers[2].state[this.joy2StrobeState];
            break;
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
            s = 0;
            break;
          case 19:
            s = 1;
            break;
          default:
            s = 0;
        }
        return (
          this.joy2StrobeState++,
          this.joy2StrobeState === 24 && (this.joy2StrobeState = 0),
          s
        );
      },
      loadROM: function () {
        if (!this.nes.rom.valid || this.nes.rom.romCount < 1)
          throw new Error("NoMapper: Invalid ROM! Unable to load.");
        this.loadPRGROM(),
          this.loadCHRROM(),
          this.loadBatteryRam(),
          this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
      },
      loadPRGROM: function () {
        this.nes.rom.romCount > 1
          ? (this.loadRomBank(0, 32768), this.loadRomBank(1, 49152))
          : (this.loadRomBank(0, 32768), this.loadRomBank(0, 49152));
      },
      loadCHRROM: function () {
        this.nes.rom.vromCount > 0 &&
          (this.nes.rom.vromCount === 1
            ? (this.loadVromBank(0, 0), this.loadVromBank(0, 4096))
            : (this.loadVromBank(0, 0), this.loadVromBank(1, 4096)));
      },
      loadBatteryRam: function () {
        if (this.nes.rom.batteryRam) {
          var s = this.nes.rom.batteryRam;
          s !== null &&
            s.length === 8192 &&
            a.copyArrayElements(s, 0, this.nes.cpu.mem, 24576, 8192);
        }
      },
      loadRomBank: function (s, t) {
        (s %= this.nes.rom.romCount),
          a.copyArrayElements(
            this.nes.rom.rom[s],
            0,
            this.nes.cpu.mem,
            t,
            16384
          );
      },
      loadVromBank: function (s, t) {
        if (this.nes.rom.vromCount !== 0) {
          this.nes.ppu.triggerRendering(),
            a.copyArrayElements(
              this.nes.rom.vrom[s % this.nes.rom.vromCount],
              0,
              this.nes.ppu.vramMem,
              t,
              4096
            );
          var o = this.nes.rom.vromTile[s % this.nes.rom.vromCount];
          a.copyArrayElements(o, 0, this.nes.ppu.ptTile, t >> 4, 256);
        }
      },
      load32kRomBank: function (s, t) {
        this.loadRomBank((s * 2) % this.nes.rom.romCount, t),
          this.loadRomBank((s * 2 + 1) % this.nes.rom.romCount, t + 16384);
      },
      load8kVromBank: function (s, t) {
        this.nes.rom.vromCount !== 0 &&
          (this.nes.ppu.triggerRendering(),
          this.loadVromBank(s % this.nes.rom.vromCount, t),
          this.loadVromBank((s + 1) % this.nes.rom.vromCount, t + 4096));
      },
      load1kVromBank: function (s, t) {
        if (this.nes.rom.vromCount !== 0) {
          this.nes.ppu.triggerRendering();
          var o = Math.floor(s / 4) % this.nes.rom.vromCount,
            e = (s % 4) * 1024;
          a.copyArrayElements(
            this.nes.rom.vrom[o],
            e,
            this.nes.ppu.vramMem,
            t,
            1024
          );
          for (var i = this.nes.rom.vromTile[o], r = t >> 4, n = 0; n < 64; n++)
            this.nes.ppu.ptTile[r + n] = i[(s % 4 << 6) + n];
        }
      },
      load2kVromBank: function (s, t) {
        if (this.nes.rom.vromCount !== 0) {
          this.nes.ppu.triggerRendering();
          var o = Math.floor(s / 2) % this.nes.rom.vromCount,
            e = (s % 2) * 2048;
          a.copyArrayElements(
            this.nes.rom.vrom[o],
            e,
            this.nes.ppu.vramMem,
            t,
            2048
          );
          for (
            var i = this.nes.rom.vromTile[o], r = t >> 4, n = 0;
            n < 128;
            n++
          )
            this.nes.ppu.ptTile[r + n] = i[(s % 2 << 7) + n];
        }
      },
      load8kRomBank: function (s, t) {
        var o = Math.floor(s / 2) % this.nes.rom.romCount,
          e = (s % 2) * 8192;
        a.copyArrayElements(this.nes.rom.rom[o], e, this.nes.cpu.mem, t, 8192);
      },
      clockIrqCounter: function () {},
      // eslint-disable-next-line no-unused-vars
      latchAccess: function (s) {},
      toJSON: function () {
        return {
          joy1StrobeState: this.joy1StrobeState,
          joy2StrobeState: this.joy2StrobeState,
          joypadLastWrite: this.joypadLastWrite,
        };
      },
      fromJSON: function (s) {
        (this.joy1StrobeState = s.joy1StrobeState),
          (this.joy2StrobeState = s.joy2StrobeState),
          (this.joypadLastWrite = s.joypadLastWrite);
      },
    }),
    (h[1] = function (s) {
      this.nes = s;
    }),
    (h[1].prototype = new h[0]()),
    (h[1].prototype.reset = function () {
      h[0].prototype.reset.apply(this),
        (this.regBuffer = 0),
        (this.regBufferCounter = 0),
        (this.mirroring = 0),
        (this.oneScreenMirroring = 0),
        (this.prgSwitchingArea = 1),
        (this.prgSwitchingSize = 1),
        (this.vromSwitchingSize = 0),
        (this.romSelectionReg0 = 0),
        (this.romSelectionReg1 = 0),
        (this.romBankSelect = 0);
    }),
    (h[1].prototype.write = function (s, t) {
      if (s < 32768) {
        h[0].prototype.write.apply(this, arguments);
        return;
      }
      t & 128
        ? ((this.regBufferCounter = 0),
          (this.regBuffer = 0),
          this.getRegNumber(s) === 0 &&
            ((this.prgSwitchingArea = 1), (this.prgSwitchingSize = 1)))
        : ((this.regBuffer =
            (this.regBuffer & (255 - (1 << this.regBufferCounter))) |
            ((t & 1) << this.regBufferCounter)),
          this.regBufferCounter++,
          this.regBufferCounter === 5 &&
            (this.setReg(this.getRegNumber(s), this.regBuffer),
            (this.regBuffer = 0),
            (this.regBufferCounter = 0)));
    }),
    (h[1].prototype.setReg = function (s, t) {
      var o;
      switch (s) {
        case 0:
          (o = t & 3),
            o !== this.mirroring &&
              ((this.mirroring = o),
              this.mirroring & 2
                ? this.mirroring & 1
                  ? this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING)
                  : this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING)
                : this.nes.ppu.setMirroring(
                    this.nes.rom.SINGLESCREEN_MIRRORING
                  )),
            (this.prgSwitchingArea = (t >> 2) & 1),
            (this.prgSwitchingSize = (t >> 3) & 1),
            (this.vromSwitchingSize = (t >> 4) & 1);
          break;
        case 1:
          (this.romSelectionReg0 = (t >> 4) & 1),
            this.nes.rom.vromCount > 0 &&
              (this.vromSwitchingSize === 0
                ? this.romSelectionReg0 === 0
                  ? this.load8kVromBank(t & 15, 0)
                  : this.load8kVromBank(
                      Math.floor(this.nes.rom.vromCount / 2) + (t & 15),
                      0
                    )
                : this.romSelectionReg0 === 0
                ? this.loadVromBank(t & 15, 0)
                : this.loadVromBank(
                    Math.floor(this.nes.rom.vromCount / 2) + (t & 15),
                    0
                  ));
          break;
        case 2:
          (this.romSelectionReg1 = (t >> 4) & 1),
            this.nes.rom.vromCount > 0 &&
              this.vromSwitchingSize === 1 &&
              (this.romSelectionReg1 === 0
                ? this.loadVromBank(t & 15, 4096)
                : this.loadVromBank(
                    Math.floor(this.nes.rom.vromCount / 2) + (t & 15),
                    4096
                  ));
          break;
        default:
          o = t & 15;
          var e,
            i = 0;
          this.nes.rom.romCount >= 32
            ? this.vromSwitchingSize === 0
              ? this.romSelectionReg0 === 1 && (i = 16)
              : (i =
                  (this.romSelectionReg0 | (this.romSelectionReg1 << 1)) << 3)
            : this.nes.rom.romCount >= 16 &&
              this.romSelectionReg0 === 1 &&
              (i = 8),
            this.prgSwitchingSize === 0
              ? ((e = i + (t & 15)), this.load32kRomBank(e, 32768))
              : ((e = i * 2 + (t & 15)),
                this.prgSwitchingArea === 0
                  ? this.loadRomBank(e, 49152)
                  : this.loadRomBank(e, 32768));
      }
    }),
    (h[1].prototype.getRegNumber = function (s) {
      return s >= 32768 && s <= 40959
        ? 0
        : s >= 40960 && s <= 49151
        ? 1
        : s >= 49152 && s <= 57343
        ? 2
        : 3;
    }),
    (h[1].prototype.loadROM = function () {
      if (!this.nes.rom.valid)
        throw new Error("MMC1: Invalid ROM! Unable to load.");
      this.loadRomBank(0, 32768),
        this.loadRomBank(this.nes.rom.romCount - 1, 49152),
        this.loadCHRROM(),
        this.loadBatteryRam(),
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }),
    (h[1].prototype.switchLowHighPrgRom = function (s) {}),
    (h[1].prototype.switch16to32 = function () {}),
    (h[1].prototype.switch32to16 = function () {}),
    (h[1].prototype.toJSON = function () {
      var s = h[0].prototype.toJSON.apply(this);
      return (
        (s.mirroring = this.mirroring),
        (s.oneScreenMirroring = this.oneScreenMirroring),
        (s.prgSwitchingArea = this.prgSwitchingArea),
        (s.prgSwitchingSize = this.prgSwitchingSize),
        (s.vromSwitchingSize = this.vromSwitchingSize),
        (s.romSelectionReg0 = this.romSelectionReg0),
        (s.romSelectionReg1 = this.romSelectionReg1),
        (s.romBankSelect = this.romBankSelect),
        (s.regBuffer = this.regBuffer),
        (s.regBufferCounter = this.regBufferCounter),
        s
      );
    }),
    (h[1].prototype.fromJSON = function (s) {
      h[0].prototype.fromJSON.apply(this, arguments),
        (this.mirroring = s.mirroring),
        (this.oneScreenMirroring = s.oneScreenMirroring),
        (this.prgSwitchingArea = s.prgSwitchingArea),
        (this.prgSwitchingSize = s.prgSwitchingSize),
        (this.vromSwitchingSize = s.vromSwitchingSize),
        (this.romSelectionReg0 = s.romSelectionReg0),
        (this.romSelectionReg1 = s.romSelectionReg1),
        (this.romBankSelect = s.romBankSelect),
        (this.regBuffer = s.regBuffer),
        (this.regBufferCounter = s.regBufferCounter);
    }),
    (h[2] = function (s) {
      this.nes = s;
    }),
    (h[2].prototype = new h[0]()),
    (h[2].prototype.write = function (s, t) {
      if (s < 32768) {
        h[0].prototype.write.apply(this, arguments);
        return;
      } else this.loadRomBank(t, 32768);
    }),
    (h[2].prototype.loadROM = function () {
      if (!this.nes.rom.valid)
        throw new Error("UNROM: Invalid ROM! Unable to load.");
      this.loadRomBank(0, 32768),
        this.loadRomBank(this.nes.rom.romCount - 1, 49152),
        this.loadCHRROM(),
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }),
    (h[3] = function (s) {
      this.nes = s;
    }),
    (h[3].prototype = new h[0]()),
    (h[3].prototype.write = function (s, t) {
      if (s < 32768) {
        h[0].prototype.write.apply(this, arguments);
        return;
      } else {
        var o = (t % (this.nes.rom.vromCount / 2)) * 2;
        this.loadVromBank(o, 0),
          this.loadVromBank(o + 1, 4096),
          this.load8kVromBank(t * 2, 0);
      }
    }),
    (h[4] = function (s) {
      (this.nes = s),
        (this.CMD_SEL_2_1K_VROM_0000 = 0),
        (this.CMD_SEL_2_1K_VROM_0800 = 1),
        (this.CMD_SEL_1K_VROM_1000 = 2),
        (this.CMD_SEL_1K_VROM_1400 = 3),
        (this.CMD_SEL_1K_VROM_1800 = 4),
        (this.CMD_SEL_1K_VROM_1C00 = 5),
        (this.CMD_SEL_ROM_PAGE1 = 6),
        (this.CMD_SEL_ROM_PAGE2 = 7),
        (this.command = null),
        (this.prgAddressSelect = null),
        (this.chrAddressSelect = null),
        (this.pageNumber = null),
        (this.irqCounter = null),
        (this.irqLatchValue = null),
        (this.irqEnable = null),
        (this.prgAddressChanged = !1);
    }),
    (h[4].prototype = new h[0]()),
    (h[4].prototype.write = function (s, t) {
      if (s < 32768) {
        h[0].prototype.write.apply(this, arguments);
        return;
      }
      switch (s) {
        case 32768:
          this.command = t & 7;
          var o = (t >> 6) & 1;
          o !== this.prgAddressSelect && (this.prgAddressChanged = !0),
            (this.prgAddressSelect = o),
            (this.chrAddressSelect = (t >> 7) & 1);
          break;
        case 32769:
          this.executeCommand(this.command, t);
          break;
        case 40960:
          t & 1
            ? this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING)
            : this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
          break;
        case 40961:
          break;
        case 49152:
          this.irqCounter = t;
          break;
        case 49153:
          this.irqLatchValue = t;
          break;
        case 57344:
          this.irqEnable = 0;
          break;
        case 57345:
          this.irqEnable = 1;
          break;
      }
    }),
    (h[4].prototype.executeCommand = function (s, t) {
      switch (s) {
        case this.CMD_SEL_2_1K_VROM_0000:
          this.chrAddressSelect === 0
            ? (this.load1kVromBank(t, 0), this.load1kVromBank(t + 1, 1024))
            : (this.load1kVromBank(t, 4096), this.load1kVromBank(t + 1, 5120));
          break;
        case this.CMD_SEL_2_1K_VROM_0800:
          this.chrAddressSelect === 0
            ? (this.load1kVromBank(t, 2048), this.load1kVromBank(t + 1, 3072))
            : (this.load1kVromBank(t, 6144), this.load1kVromBank(t + 1, 7168));
          break;
        case this.CMD_SEL_1K_VROM_1000:
          this.chrAddressSelect === 0
            ? this.load1kVromBank(t, 4096)
            : this.load1kVromBank(t, 0);
          break;
        case this.CMD_SEL_1K_VROM_1400:
          this.chrAddressSelect === 0
            ? this.load1kVromBank(t, 5120)
            : this.load1kVromBank(t, 1024);
          break;
        case this.CMD_SEL_1K_VROM_1800:
          this.chrAddressSelect === 0
            ? this.load1kVromBank(t, 6144)
            : this.load1kVromBank(t, 2048);
          break;
        case this.CMD_SEL_1K_VROM_1C00:
          this.chrAddressSelect === 0
            ? this.load1kVromBank(t, 7168)
            : this.load1kVromBank(t, 3072);
          break;
        case this.CMD_SEL_ROM_PAGE1:
          this.prgAddressChanged &&
            (this.prgAddressSelect === 0
              ? this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 49152)
              : this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 32768),
            (this.prgAddressChanged = !1)),
            this.prgAddressSelect === 0
              ? this.load8kRomBank(t, 32768)
              : this.load8kRomBank(t, 49152);
          break;
        case this.CMD_SEL_ROM_PAGE2:
          this.load8kRomBank(t, 40960),
            this.prgAddressChanged &&
              (this.prgAddressSelect === 0
                ? this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 49152)
                : this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 32768),
              (this.prgAddressChanged = !1));
      }
    }),
    (h[4].prototype.loadROM = function () {
      if (!this.nes.rom.valid)
        throw new Error("MMC3: Invalid ROM! Unable to load.");
      this.load8kRomBank((this.nes.rom.romCount - 1) * 2, 49152),
        this.load8kRomBank((this.nes.rom.romCount - 1) * 2 + 1, 57344),
        this.load8kRomBank(0, 32768),
        this.load8kRomBank(1, 40960),
        this.loadCHRROM(),
        this.loadBatteryRam(),
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }),
    (h[4].prototype.clockIrqCounter = function () {
      this.irqEnable === 1 &&
        (this.irqCounter--,
        this.irqCounter < 0 &&
          (this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL),
          (this.irqCounter = this.irqLatchValue)));
    }),
    (h[4].prototype.toJSON = function () {
      var s = h[0].prototype.toJSON.apply(this);
      return (
        (s.command = this.command),
        (s.prgAddressSelect = this.prgAddressSelect),
        (s.chrAddressSelect = this.chrAddressSelect),
        (s.pageNumber = this.pageNumber),
        (s.irqCounter = this.irqCounter),
        (s.irqLatchValue = this.irqLatchValue),
        (s.irqEnable = this.irqEnable),
        (s.prgAddressChanged = this.prgAddressChanged),
        s
      );
    }),
    (h[4].prototype.fromJSON = function (s) {
      h[0].prototype.fromJSON.apply(this, arguments),
        (this.command = s.command),
        (this.prgAddressSelect = s.prgAddressSelect),
        (this.chrAddressSelect = s.chrAddressSelect),
        (this.pageNumber = s.pageNumber),
        (this.irqCounter = s.irqCounter),
        (this.irqLatchValue = s.irqLatchValue),
        (this.irqEnable = s.irqEnable),
        (this.prgAddressChanged = s.prgAddressChanged);
    }),
    (h[5] = function (s) {
      this.nes = s;
    }),
    (h[5].prototype = new h[0]()),
    (h[5].prototype.write = function (s, t) {
      s < 32768
        ? h[0].prototype.write.apply(this, arguments)
        : this.load8kVromBank(t, 0);
    }),
    (h[5].prototype.write = function (s, t) {
      if (s < 20480) {
        h[0].prototype.write.apply(this, arguments);
        return;
      }
      switch (s) {
        case 20736:
          this.prg_size = t & 3;
          break;
        case 20737:
          this.chr_size = t & 3;
          break;
        case 20738:
          this.sram_we_a = t & 3;
          break;
        case 20739:
          this.sram_we_b = t & 3;
          break;
        case 20740:
          this.graphic_mode = t & 3;
          break;
        case 20741:
          (this.nametable_mode = t),
            (this.nametable_type[0] = t & 3),
            this.load1kVromBank(t & 3, 8192),
            (t >>= 2),
            (this.nametable_type[1] = t & 3),
            this.load1kVromBank(t & 3, 9216),
            (t >>= 2),
            (this.nametable_type[2] = t & 3),
            this.load1kVromBank(t & 3, 10240),
            (t >>= 2),
            (this.nametable_type[3] = t & 3),
            this.load1kVromBank(t & 3, 11264);
          break;
        case 20742:
          this.fill_chr = t;
          break;
        case 20743:
          this.fill_pal = t & 3;
          break;
        case 20755:
          this.SetBank_SRAM(3, t & 3);
          break;
        case 20756:
        case 20757:
        case 20758:
        case 20759:
          this.SetBank_CPU(s, t);
          break;
        case 20768:
        case 20769:
        case 20770:
        case 20771:
        case 20772:
        case 20773:
        case 20774:
        case 20775:
          (this.chr_mode = 0),
            (this.chr_page[0][s & 7] = t),
            this.SetBank_PPU();
          break;
        case 20776:
        case 20777:
        case 20778:
        case 20779:
          (this.chr_mode = 1),
            (this.chr_page[1][(s & 3) + 0] = t),
            (this.chr_page[1][(s & 3) + 4] = t),
            this.SetBank_PPU();
          break;
        case 20992:
          this.split_control = t;
          break;
        case 20993:
          this.split_scroll = t;
          break;
        case 20994:
          this.split_page = t & 63;
          break;
        case 20995:
          (this.irq_line = t), this.nes.cpu.ClearIRQ();
          break;
        case 20996:
          (this.irq_enable = t), this.nes.cpu.ClearIRQ();
          break;
        case 20997:
          this.mult_a = t;
          break;
        case 20998:
          this.mult_b = t;
          break;
        default:
          s >= 20480 && s <= 20501
            ? this.nes.papu.exWrite(s, t)
            : s >= 23552 && s <= 24575
            ? this.graphic_mode === 2 ||
              (this.graphic_mode !== 3 && this.irq_status & 64)
            : s >= 24576 &&
              s <= 32767 &&
              this.sram_we_a === 2 &&
              this.sram_we_b;
          break;
      }
    }),
    (h[5].prototype.loadROM = function () {
      if (!this.nes.rom.valid)
        throw new Error("UNROM: Invalid ROM! Unable to load.");
      this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 32768),
        this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 40960),
        this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 49152),
        this.load8kRomBank(this.nes.rom.romCount * 2 - 1, 57344),
        this.loadCHRROM(),
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }),
    (h[7] = function (s) {
      this.nes = s;
    }),
    (h[7].prototype = new h[0]()),
    (h[7].prototype.write = function (s, t) {
      s < 32768
        ? h[0].prototype.write.apply(this, arguments)
        : (this.load32kRomBank(t & 7, 32768),
          t & 16
            ? this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING2)
            : this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING));
    }),
    (h[7].prototype.loadROM = function () {
      if (!this.nes.rom.valid)
        throw new Error("AOROM: Invalid ROM! Unable to load.");
      this.loadPRGROM(),
        this.loadCHRROM(),
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }),
    (h[11] = function (s) {
      this.nes = s;
    }),
    (h[11].prototype = new h[0]()),
    (h[11].prototype.write = function (s, t) {
      if (s < 32768) {
        h[0].prototype.write.apply(this, arguments);
        return;
      } else {
        var o = ((t & 15) * 2) % this.nes.rom.romCount,
          e = ((t & 15) * 2 + 1) % this.nes.rom.romCount;
        if (
          (this.loadRomBank(o, 32768),
          this.loadRomBank(e, 49152),
          this.nes.rom.vromCount > 0)
        ) {
          var i = ((t >> 4) * 2) % this.nes.rom.vromCount;
          this.loadVromBank(i, 0), this.loadVromBank(i + 1, 4096);
        }
      }
    }),
    (h[34] = function (s) {
      this.nes = s;
    }),
    (h[34].prototype = new h[0]()),
    (h[34].prototype.write = function (s, t) {
      if (s < 32768) {
        h[0].prototype.write.apply(this, arguments);
        return;
      } else this.load32kRomBank(t, 32768);
    }),
    (h[38] = function (s) {
      this.nes = s;
    }),
    (h[38].prototype = new h[0]()),
    (h[38].prototype.write = function (s, t) {
      if (s < 28672 || s > 32767) {
        h[0].prototype.write.apply(this, arguments);
        return;
      } else
        this.load32kRomBank(t & 3, 32768),
          this.load8kVromBank(((t >> 2) & 3) * 2, 0);
    }),
    (h[66] = function (s) {
      this.nes = s;
    }),
    (h[66].prototype = new h[0]()),
    (h[66].prototype.write = function (s, t) {
      if (s < 32768) {
        h[0].prototype.write.apply(this, arguments);
        return;
      } else
        this.load32kRomBank((t >> 4) & 3, 32768),
          this.load8kVromBank((t & 3) * 2, 0);
    }),
    (h[94] = function (s) {
      this.nes = s;
    }),
    (h[94].prototype = new h[0]()),
    (h[94].prototype.write = function (s, t) {
      if (s < 32768) {
        h[0].prototype.write.apply(this, arguments);
        return;
      } else this.loadRomBank(t >> 2, 32768);
    }),
    (h[94].prototype.loadROM = function () {
      if (!this.nes.rom.valid)
        throw new Error("UN1ROM: Invalid ROM! Unable to load.");
      this.loadRomBank(0, 32768),
        this.loadRomBank(this.nes.rom.romCount - 1, 49152),
        this.loadCHRROM(),
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }),
    (h[140] = function (s) {
      this.nes = s;
    }),
    (h[140].prototype = new h[0]()),
    (h[140].prototype.write = function (s, t) {
      if (s < 24576 || s > 32767) {
        h[0].prototype.write.apply(this, arguments);
        return;
      } else
        this.load32kRomBank((t >> 4) & 3, 32768),
          this.load8kVromBank((t & 15) * 2, 0);
    }),
    (h[180] = function (s) {
      this.nes = s;
    }),
    (h[180].prototype = new h[0]()),
    (h[180].prototype.write = function (s, t) {
      if (s < 32768) {
        h[0].prototype.write.apply(this, arguments);
        return;
      } else this.loadRomBank(t, 49152);
    }),
    (h[180].prototype.loadROM = function () {
      if (!this.nes.rom.valid)
        throw new Error("Mapper 180: Invalid ROM! Unable to load.");
      this.loadRomBank(0, 32768),
        this.loadRomBank(this.nes.rom.romCount - 1, 49152),
        this.loadCHRROM(),
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }),
    (ft = h),
    ft
  );
}
var ct, Gt;
function Ki() {
  if (Gt) return ct;
  Gt = 1;
  var a = Zi(),
    h = hi(),
    s = function (t) {
      (this.nes = t), (this.mapperName = new Array(92));
      for (var o = 0; o < 92; o++) this.mapperName[o] = "Unknown Mapper";
      (this.mapperName[0] = "Direct Access"),
        (this.mapperName[1] = "Nintendo MMC1"),
        (this.mapperName[2] = "UNROM"),
        (this.mapperName[3] = "CNROM"),
        (this.mapperName[4] = "Nintendo MMC3"),
        (this.mapperName[5] = "Nintendo MMC5"),
        (this.mapperName[6] = "FFE F4xxx"),
        (this.mapperName[7] = "AOROM"),
        (this.mapperName[8] = "FFE F3xxx"),
        (this.mapperName[9] = "Nintendo MMC2"),
        (this.mapperName[10] = "Nintendo MMC4"),
        (this.mapperName[11] = "Color Dreams Chip"),
        (this.mapperName[12] = "FFE F6xxx"),
        (this.mapperName[15] = "100-in-1 switch"),
        (this.mapperName[16] = "Bandai chip"),
        (this.mapperName[17] = "FFE F8xxx"),
        (this.mapperName[18] = "Jaleco SS8806 chip"),
        (this.mapperName[19] = "Namcot 106 chip"),
        (this.mapperName[20] = "Famicom Disk System"),
        (this.mapperName[21] = "Konami VRC4a"),
        (this.mapperName[22] = "Konami VRC2a"),
        (this.mapperName[23] = "Konami VRC2a"),
        (this.mapperName[24] = "Konami VRC6"),
        (this.mapperName[25] = "Konami VRC4b"),
        (this.mapperName[32] = "Irem G-101 chip"),
        (this.mapperName[33] = "Taito TC0190/TC0350"),
        (this.mapperName[34] = "32kB ROM switch"),
        (this.mapperName[64] = "Tengen RAMBO-1 chip"),
        (this.mapperName[65] = "Irem H-3001 chip"),
        (this.mapperName[66] = "GNROM switch"),
        (this.mapperName[67] = "SunSoft3 chip"),
        (this.mapperName[68] = "SunSoft4 chip"),
        (this.mapperName[69] = "SunSoft5 FME-7 chip"),
        (this.mapperName[71] = "Camerica chip"),
        (this.mapperName[78] = "Irem 74HC161/32-based"),
        (this.mapperName[91] = "Pirate HK-SF3 chip");
    };
  return (
    (s.prototype = {
      // Mirroring types:
      VERTICAL_MIRRORING: 0,
      HORIZONTAL_MIRRORING: 1,
      FOURSCREEN_MIRRORING: 2,
      SINGLESCREEN_MIRRORING: 3,
      SINGLESCREEN_MIRRORING2: 4,
      SINGLESCREEN_MIRRORING3: 5,
      SINGLESCREEN_MIRRORING4: 6,
      CHRROM_MIRRORING: 7,
      header: null,
      rom: null,
      vrom: null,
      vromTile: null,
      romCount: null,
      vromCount: null,
      mirroring: null,
      batteryRam: null,
      trainer: null,
      fourScreen: null,
      mapperType: null,
      valid: !1,
      load: function (t) {
        var o, e, i;
        if (t.indexOf("NES") === -1) throw new Error("Not a valid NES ROM.");
        for (this.header = new Array(16), o = 0; o < 16; o++)
          this.header[o] = t.charCodeAt(o) & 255;
        (this.romCount = this.header[4]),
          (this.vromCount = this.header[5] * 2),
          (this.mirroring = this.header[6] & 1 ? 1 : 0),
          (this.batteryRam = (this.header[6] & 2) !== 0),
          (this.trainer = (this.header[6] & 4) !== 0),
          (this.fourScreen = (this.header[6] & 8) !== 0),
          (this.mapperType = (this.header[6] >> 4) | (this.header[7] & 240));
        var r = !1;
        for (o = 8; o < 16; o++)
          if (this.header[o] !== 0) {
            r = !0;
            break;
          }
        r && (this.mapperType &= 15), (this.rom = new Array(this.romCount));
        var n = 16;
        for (o = 0; o < this.romCount; o++) {
          for (
            this.rom[o] = new Array(16384), e = 0;
            e < 16384 && !(n + e >= t.length);
            e++
          )
            this.rom[o][e] = t.charCodeAt(n + e) & 255;
          n += 16384;
        }
        for (
          this.vrom = new Array(this.vromCount), o = 0;
          o < this.vromCount;
          o++
        ) {
          for (
            this.vrom[o] = new Array(4096), e = 0;
            e < 4096 && !(n + e >= t.length);
            e++
          )
            this.vrom[o][e] = t.charCodeAt(n + e) & 255;
          n += 4096;
        }
        for (
          this.vromTile = new Array(this.vromCount), o = 0;
          o < this.vromCount;
          o++
        )
          for (this.vromTile[o] = new Array(256), e = 0; e < 256; e++)
            this.vromTile[o][e] = new h();
        var u, l;
        for (i = 0; i < this.vromCount; i++)
          for (o = 0; o < 4096; o++)
            (u = o >> 4),
              (l = o % 16),
              l < 8
                ? this.vromTile[i][u].setScanline(
                    l,
                    this.vrom[i][o],
                    this.vrom[i][o + 8]
                  )
                : this.vromTile[i][u].setScanline(
                    l - 8,
                    this.vrom[i][o - 8],
                    this.vrom[i][o]
                  );
        this.valid = !0;
      },
      getMirroringType: function () {
        return this.fourScreen
          ? this.FOURSCREEN_MIRRORING
          : this.mirroring === 0
          ? this.HORIZONTAL_MIRRORING
          : this.VERTICAL_MIRRORING;
      },
      getMapperName: function () {
        return this.mapperType >= 0 && this.mapperType < this.mapperName.length
          ? this.mapperName[this.mapperType]
          : "Unknown Mapper, " + this.mapperType;
      },
      mapperSupported: function () {
        return typeof a[this.mapperType] < "u";
      },
      createMapper: function () {
        if (this.mapperSupported()) return new a[this.mapperType](this.nes);
        throw new Error(
          "This ROM uses a mapper not supported by JSNES: " +
            this.getMapperName() +
            "(" +
            this.mapperType +
            ")"
        );
      },
    }),
    (ct = s),
    ct
  );
}
var mt, qt;
function Ji() {
  if (qt) return mt;
  qt = 1;
  var a = Hi(),
    h = si(),
    s = Wi(),
    t = Ui(),
    o = Ki(),
    e = function (i) {
      if (
        ((this.opts = {
          onFrame: function () {},
          onAudioSample: null,
          onStatusUpdate: function () {},
          onBatteryRamWrite: function () {},
          // FIXME: not actually used except for in PAPU
          preferredFrameRate: 60,
          emulateSound: !0,
          sampleRate: 48e3,
          // Sound sample rate in hz
        }),
        typeof i < "u")
      ) {
        var r;
        for (r in this.opts) typeof i[r] < "u" && (this.opts[r] = i[r]);
      }
      (this.frameTime = 1e3 / this.opts.preferredFrameRate),
        (this.ui = {
          writeFrame: this.opts.onFrame,
          updateStatus: this.opts.onStatusUpdate,
        }),
        (this.cpu = new a(this)),
        (this.ppu = new s(this)),
        (this.papu = new t(this)),
        (this.mmap = null),
        (this.controllers = {
          1: new h(),
          2: new h(),
        }),
        this.ui.updateStatus("Ready to load a ROM."),
        (this.frame = this.frame.bind(this)),
        (this.buttonDown = this.buttonDown.bind(this)),
        (this.buttonUp = this.buttonUp.bind(this)),
        (this.zapperMove = this.zapperMove.bind(this)),
        (this.zapperFireDown = this.zapperFireDown.bind(this)),
        (this.zapperFireUp = this.zapperFireUp.bind(this));
    };
  return (
    (e.prototype = {
      fpsFrameCount: 0,
      romData: null,
      // Resets the system
      reset: function () {
        this.mmap !== null && this.mmap.reset(),
          this.cpu.reset(),
          this.ppu.reset(),
          this.papu.reset(),
          (this.lastFpsTime = null),
          (this.fpsFrameCount = 0);
      },
      frame: function () {
        this.ppu.startFrame();
        var i = 0,
          r = this.opts.emulateSound,
          n = this.cpu,
          u = this.ppu,
          l = this.papu;
        t: for (;;)
          for (
            n.cyclesToHalt === 0
              ? ((i = n.emulate()), r && l.clockFrameCounter(i), (i *= 3))
              : n.cyclesToHalt > 8
              ? ((i = 24), r && l.clockFrameCounter(8), (n.cyclesToHalt -= 8))
              : ((i = n.cyclesToHalt * 3),
                r && l.clockFrameCounter(n.cyclesToHalt),
                (n.cyclesToHalt = 0));
            i > 0;
            i--
          ) {
            if (
              (u.curX === u.spr0HitX &&
                u.f_spVisibility === 1 &&
                u.scanline - 21 === u.spr0HitY &&
                u.setStatusFlag(u.STATUS_SPRITE0HIT, !0),
              u.requestEndFrame && (u.nmiCounter--, u.nmiCounter === 0))
            ) {
              (u.requestEndFrame = !1), u.startVBlank();
              break t;
            }
            u.curX++, u.curX === 341 && ((u.curX = 0), u.endScanline());
          }
        this.fpsFrameCount++;
      },
      buttonDown: function (i, r) {
        this.controllers[i].buttonDown(r);
      },
      buttonUp: function (i, r) {
        this.controllers[i].buttonUp(r);
      },
      zapperMove: function (i, r) {
        this.mmap && ((this.mmap.zapperX = i), (this.mmap.zapperY = r));
      },
      zapperFireDown: function () {
        this.mmap && (this.mmap.zapperFired = !0);
      },
      zapperFireUp: function () {
        this.mmap && (this.mmap.zapperFired = !1);
      },
      getFPS: function () {
        var i = +(/* @__PURE__ */ new Date()),
          r = null;
        return (
          this.lastFpsTime &&
            (r = this.fpsFrameCount / ((i - this.lastFpsTime) / 1e3)),
          (this.fpsFrameCount = 0),
          (this.lastFpsTime = i),
          r
        );
      },
      reloadROM: function () {
        this.romData !== null && this.loadROM(this.romData);
      },
      // Loads a ROM file into the CPU and PPU.
      // The ROM file is validated first.
      loadROM: function (i) {
        (this.rom = new o(this)),
          this.rom.load(i),
          this.reset(),
          (this.mmap = this.rom.createMapper()),
          this.mmap.loadROM(),
          this.ppu.setMirroring(this.rom.getMirroringType()),
          (this.romData = i);
      },
      setFramerate: function (i) {
        (this.opts.preferredFrameRate = i),
          (this.frameTime = 1e3 / i),
          this.papu.setSampleRate(this.opts.sampleRate, !1);
      },
      toJSON: function () {
        return {
          romData: this.romData,
          cpu: this.cpu.toJSON(),
          mmap: this.mmap.toJSON(),
          ppu: this.ppu.toJSON(),
        };
      },
      fromJSON: function (i) {
        this.reset(),
          (this.romData = i.romData),
          this.cpu.fromJSON(i.cpu),
          this.mmap.fromJSON(i.mmap),
          this.ppu.fromJSON(i.ppu);
      },
    }),
    (mt = e),
    mt
  );
}
var Rt, Xt;
function zi() {
  return (
    Xt ||
      ((Xt = 1),
      (Rt = {
        Controller: si(),
        NES: Ji(),
      })),
    Rt
  );
}
var ji = zi();
const $i = /* @__PURE__ */ Yi(ji),
  W = class W {
    constructor() {
      x(this, "enable");
      x(this, "fixed");
      x(this, "greater");
      x(this, "lesser");
      (this.enable = !1),
        (this.fixed = {}),
        (this.greater = {}),
        (this.lesser = {});
    }
    parse(h) {
      const s = W.reg.exec(h);
      if (!s) return;
      const t = Z(s[1]),
        o = Z(s[2]),
        e = Z(s[4]);
      this.on(t, o, e);
    }
    on(h, s, t) {
      if (!(h > m.cpu.mem.length - 1))
        switch ((this.enable || (this.enable = !0), s)) {
          case 0:
            this.fixed[h] = t;
            break;
          case 1:
            m.cpu.mem[h] = t;
            break;
          case 2:
            this.lesser[h] = t;
            break;
          case 3:
            this.greater[h] = t;
            break;
        }
    }
    remove(h) {
      delete this.fixed[h], delete this.greater[h], delete this.lesser[h];
    }
    disable(h) {
      const s = W.reg.exec(h);
      if (!s) return;
      const t = Z(s[1]);
      this.remove(t);
    }
    init() {
      (this.enable = !1),
        (this.fixed = {}),
        (this.greater = {}),
        (this.lesser = {});
    }
    onFrame() {
      this.enable &&
        (rt(this.fixed).forEach(([h, s]) => {
          m.cpu.mem[h] = s;
        }),
        rt(this.greater).forEach(([h, s]) => {
          m.cpu.mem[h] < s && (m.cpu.mem[h] = s);
        }),
        rt(this.lesser).forEach(([h, s]) => {
          m.cpu.mem[h] > s && (m.cpu.mem[h] = s);
        }));
    }
  };
x(W, "reg", /([\da-fA-F]{4})-([0-3])([0-4])-([\da-fA-F]{2,8})/);
let xt = W;
const L = new xt(),
  it = 256,
  et = 240;
let z, ri, ni, j;
const dt = new ImageData(it, et);
function Qi(a) {
  m.frameCounter++;
  for (let h = 0; h < 256 * 240; h += 1) ni[h] = 4278190080 | a[h];
  L.onFrame();
}
function te() {
  dt.data.set(ri), j.putImageData(dt, 0, 0);
}
function ie(a) {
  (j = a.getContext("2d")), (j.fillStyle = "black"), j.fillRect(0, 0, it, et);
  const h = new ArrayBuffer(dt.data.length);
  (ri = new Uint8ClampedArray(h)),
    (ni = new Uint32Array(h)),
    (m.frameCounter = 1),
    (z = requestAnimationFrame(s));
  function s() {
    cancelAnimationFrame(z), (z = requestAnimationFrame(s)), te();
  }
}
function Yt(a) {
  const h = a.parentNode,
    s = h.clientWidth,
    t = h.clientHeight,
    o = s / t,
    e = it / et;
  e < o
    ? ((a.style.height = `${t}px`), (a.style.width = `${Math.round(t + e)}px`))
    : ((a.style.width = `${s}px`), (a.style.height = `${Math.round(s / e)}px`));
}
function Ht() {
  cancelAnimationFrame(z);
}
function ee(a) {
  const h = new Image();
  return (h.src = a.toDataURL("image/png")), h;
}
let G = {};
const Wt = "........",
  _t = /\|\d\|([LRUDTSAB.]{8})\|([LRUDTSAB.]{8})?\|\|/g;
function se() {
  G = {};
}
function Ut(a, h) {
  let s = _t.exec(a),
    t = 0 + h,
    o = !1;
  if ((se(), !!s))
    for (; s; ) {
      const e = s[1] === Wt,
        i = s[2] === Wt;
      if (e && i) {
        o &&
          ((G[t] = {
            p1: D(8, 64),
            p2: D(8, 64),
          }),
          (o = !1)),
          t++,
          (s = _t.exec(a));
        continue;
      }
      o = !0;
      const r = s[1]
          ? s[1]
              .split("")
              .map((u) => (u === "." ? 64 : 65))
              .reverse()
          : D(8, 64),
        n = s[2]
          ? s[2]
              .split("")
              .map((u) => (u === "." ? 64 : 65))
              .reverse()
          : D(8, 64);
      (s = _t.exec(a)),
        (G[t] = {
          p1: r,
          p2: n,
        }),
        t++;
    }
}
const m = new $i.NES({
  onFrame: Qi,
  onAudioSample: oe,
  sampleRate: le(),
});
m.videoMode = !1;
m.frameCounter = 1;
m.playbackMode = !1;
const F = { buffer: null };
function he() {
  if (m.videoMode && m.frameCounter in G) {
    const a = G[m.frameCounter];
    m.frameCounter > 0 &&
      ((m.controllers[1].state = a.p1), (m.controllers[2].state = a.p2));
  }
  m.frame();
}
function Zt(a) {
  const h = m.ppu.toJSON(),
    s = m.mmap.toJSON(),
    t = B(h.vramMem),
    o = qi(h.nameTable),
    e = Vi(h.ptTile);
  delete h.attrib,
    delete h.bgbuffer,
    delete h.buffer,
    delete h.pixrendered,
    delete h.vramMirrorTable,
    delete h.vramMem,
    delete h.nameTable,
    delete h.ptTile;
  const i = m.cpu.toJSON(),
    r = B(i.mem);
  return (
    delete i.mem,
    {
      path: a,
      data: {
        cpu: i,
        mmap: s,
        ppu: h,
        vramMemZip: t,
        nameTableZip: o,
        cpuMemZip: r,
        ptTileZip: e,
        frameCounter: m.frameCounter,
      },
    }
  );
}
function re(a, h, s) {
  if (s && a.path !== s)
    return h({
      code: 2,
      message: `Load Error: The saved data is inconsistent with the current game, saved: ${a.path}, current: ${s}.`,
    });
  if (!F.buffer)
    return h({
      code: 3,
      message: "Load Error: NES ROM is not loaded.",
    });
  try {
    const {
      ppu: t,
      cpu: o,
      mmap: e,
      frameCounter: i,
      vramMemZip: r,
      nameTableZip: n,
      cpuMemZip: u,
      ptTileZip: l,
    } = a.data;
    (t.attrib = D(32, 0)),
      (t.bgbuffer = D(61440, 0)),
      (t.buffer = D(61440, 0)),
      (t.pixrendered = D(61440, 0)),
      (t.vramMem = V(r)),
      (t.nameTable = Xi(n)),
      (t.vramMirrorTable = Bi()),
      (t.ptTile = Gi(l)),
      (o.mem = V(u)),
      m.ppu.reset(),
      (m.romData = F.buffer),
      m.cpu.fromJSON(o),
      m.mmap.fromJSON(e),
      m.ppu.fromJSON(t),
      (m.frameCounter = i);
  } catch (t) {
    console.error(t),
      h({
        code: 3,
        message: "Load Error: The saved data is invalid.",
      });
  }
}
class ne {
  constructor() {
    x(this, "_events");
    x(this, "_auto");
    (this._events = {}),
      (this._auto = {
        1: {
          8: {
            timeout: 0,
            beDown: !1,
            once: !0,
          },
          9: {
            timeout: 0,
            beDown: !1,
            once: !0,
          },
        },
        2: {
          8: {
            timeout: 0,
            beDown: !1,
            once: !0,
          },
          9: {
            timeout: 0,
            beDown: !1,
            once: !0,
          },
        },
      });
  }
  on(h, s) {
    this._events[h] || (this._events[h] = []), this._events[h].push(s);
  }
  emit(h, s, t) {
    var o;
    (o = this._events[h]) == null ||
      o.forEach((e) => {
        const i = m.controllers[e.p].state;
        if (e.index <= 7) i[e.index] = s;
        else {
          const r = this._auto[e.p][e.index];
          s === 65
            ? r.once &&
              ((i[e.index - 8] = 65),
              (r.timeout = window.setInterval(() => {
                (i[e.index - 8] = r.beDown ? 65 : 64), (r.beDown = !r.beDown);
              }, t)),
              (r.once = !1))
            : (clearInterval(r.timeout),
              (i[e.index - 8] = 64),
              (r.once = !0),
              (r.beDown = !1));
        }
      });
  }
  getState(h) {
    return this._events[h];
  }
  init() {
    this._events = {};
  }
}
const $ = new ne();
let y = new AudioContext(),
  w,
  St = 1;
const Kt = 512,
  Ct = 4 * 1024,
  tt = Ct - 1,
  ai = new Float32Array(Ct),
  oi = new Float32Array(Ct);
let Y = 0,
  Q = 0;
function ae() {
  return (Y - Q) & tt;
}
function oe(a, h) {
  (ai[Y] = a), (oi[Y] = h), (Y = (Y + 1) & tt);
}
function le() {
  if (!window.AudioContext) return 44100;
  const a = new window.AudioContext(),
    h = a.sampleRate;
  return a.close(), h;
}
function ue() {
  (y = new AudioContext()),
    (w = y.createScriptProcessor(Kt, 0, 2)),
    (w.onaudioprocess = (a) => {
      const h = a.outputBuffer,
        s = h.length;
      ae() < Kt && he();
      const t = h.getChannelData(0),
        o = h.getChannelData(1);
      for (let e = 0; e < s; e++) {
        const i = (Q + e) & tt;
        (t[e] = ai[i] * St), (o[e] = oi[i] * St);
      }
      Q = (Q + s) & tt;
    }),
    w.connect(y.destination);
}
function Jt() {
  w.disconnect(y.destination),
    (w.onaudioprocess = null),
    (w = {}),
    "close" in y && y.close();
}
function pe() {
  y.suspend();
}
function fe() {
  y.resume();
}
function zt(a) {
  St = gt(a, 0, 100) / 100;
}
function ce(a) {
  return a !== null && typeof a == "object" && !Array.isArray(a);
}
function me(a) {
  return a === void 0;
}
function Re(a) {
  return a === null;
}
function st(a) {
  return typeof a == "number" ? Number.isNaN(a) : Re(a) || me(a);
}
function _e(a) {
  return !st(a);
}
function xe(a, h = !0) {
  const s = h ? !1 : st(a);
  return Array.isArray(a) ? a.length === 0 : s;
}
function de(a, h = !0) {
  const s = h ? !1 : st(a);
  return ce(a) ? xe(Object.keys(a)) : s;
}
function li() {
  let a = "";
  if (typeof crypto < "u" && "randomUUID" in crypto) a = crypto.randomUUID();
  else if (typeof Blob > "u") a = `${X(8)}-${X(4)}-${X(4)}-${X(4)}-${X(12)}`;
  else {
    const h = URL.createObjectURL(new Blob());
    (a = h.toString().substring(h.lastIndexOf("/") + 1)),
      URL.revokeObjectURL(h);
  }
  return a;
}
function X(a, h = 16) {
  h = gt(h, 2, 36);
  let s = "";
  for (let t = 1; t <= a; t++) s += Math.floor(Math.random() * h).toString(h);
  return s;
}
function Se(a, h = li()) {
  ge(a.toDataURL("image/png"), h);
}
function ge(a, h = li()) {
  const s = document.createElement("a");
  (s.href = a), (s.download = h), s.click();
}
function ui(a) {
  return Object.keys(a);
}
function jt(a, h) {
  return a in h;
}
const K = 0.3,
  $t = {
    A: 0,
    B: 1,
    SELECT: 2,
    START: 3,
    UP: 4,
    DOWN: 5,
    LEFT: 6,
    RIGHT: 7,
    C: 8,
    D: 9,
  },
  Dt = {
    UP: "KeyW",
    DOWN: "KeyS",
    LEFT: "KeyA",
    RIGHT: "KeyD",
    A: "KeyK",
    B: "KeyJ",
    C: "KeyI",
    D: "KeyU",
    SELECT: "Digit2",
    START: "Digit1",
  },
  bt = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    A: "Numpad2",
    B: "Numpad1",
    C: "Numpad5",
    D: "Numpad4",
    SELECT: "NumpadDecimal",
    START: "NumpadEnter",
  };
let pi = 1e3 / (2 * 16);
function C(a, h) {
  $.emit(a, h, pi);
}
class Ae {
  constructor(h) {
    x(this, "animationFrame");
    x(this, "axesHolding");
    x(this, "btnHolding");
    x(this, "gamepadBtns");
    window.addEventListener(
      "gamepadconnected",
      this.connectHandler.bind(this, !0)
    ),
      window.addEventListener(
        "gamepaddisconnected",
        this.connectHandler.bind(this, !1)
      ),
      (this.animationFrame = requestAnimationFrame(this.frame.bind(this))),
      (this.btnHolding = {
        p1: U(20),
        p2: U(20),
      }),
      (this.axesHolding = {
        p1: U(4),
        p2: U(4),
      }),
      (this.gamepadBtns = h);
  }
  get gamepads() {
    return wi(navigator.getGamepads());
  }
  connectHandler(h, s) {
    console.log("控制器连接"),
      h
        ? (this.gamepads[s.gamepad.index] = s.gamepad)
        : this.gamepads.length === 0 && this.close();
  }
  axesHandler(h, s, t, o) {
    var i;
    const e = (i = this.axesHolding[h]) == null ? void 0 : i[t];
    s
      ? e ||
        (C(this.gamepadBtns.value[h][o], 65), (this.axesHolding[h][t] = !0))
      : e &&
        (C(this.gamepadBtns.value[h][o], 64), (this.axesHolding[h][t] = !1));
  }
  btnHandler(h, s, t) {
    var e;
    const o = (e = this.btnHolding[h]) == null ? void 0 : e[t];
    if (s.pressed) {
      if (o) return;
      C(this.gamepadBtns.value[h][t], 65), (this.btnHolding[h][t] = !0);
    } else
      o && (C(this.gamepadBtns.value[h][t], 64), (this.btnHolding[h][t] = !1));
  }
  frame() {
    for (let h = 0; h < this.gamepads.length && !(h > 1); h++) {
      const s = `p${h + 1}`,
        t = this.gamepads[h];
      t.buttons.forEach(this.btnHandler.bind(this, s));
      const o = t.axes[0],
        e = t.axes[1];
      this.axesHandler(s, o > K, 0, 15),
        this.axesHandler(s, o < -K, 1, 14),
        this.axesHandler(s, e > K, 2, 13),
        this.axesHandler(s, e < -K, 3, 12);
    }
  }
  run() {
    this.frame(),
      cancelAnimationFrame(this.animationFrame),
      (this.animationFrame = requestAnimationFrame(this.run.bind(this)));
  }
  close() {
    this.btnHolding.p1.fill(!1),
      this.btnHolding.p2.fill(!1),
      this.axesHolding.p1.fill(!1),
      this.axesHolding.p2.fill(!1),
      cancelAnimationFrame(this.animationFrame);
  }
}
function Ce(a) {
  const h = J(() => Object.assign(Dt, a.p1)),
    s = J(() => Object.assign(bt, a.p2));
  function t() {
    pi = 1e3 / (2 * gt(a.turbo, 5, 20));
  }
  function o() {
    $.init(),
      ui($t).forEach((r) => {
        const n = $t[r];
        $.on(h.value[r], {
          p: 1,
          index: n,
        }),
          $.on(s.value[r], {
            p: r === "SELECT" || r === "START" ? 1 : 2,
            index: n,
          });
      });
  }
  o(),
    t(),
    H(() => a.p1, o, { deep: !0 }),
    H(() => a.p2, o, { deep: !0 }),
    H(() => a.turbo, t);
  const e = J(() => ({
      p1: [
        h.value.A,
        h.value.C,
        h.value.B,
        h.value.D,
        "",
        "",
        "",
        "",
        h.value.SELECT,
        h.value.START,
        "",
        "",
        h.value.UP,
        h.value.DOWN,
        h.value.LEFT,
        h.value.RIGHT,
      ],
      p2: [
        s.value.A,
        s.value.C,
        s.value.B,
        s.value.D,
        "",
        "",
        "",
        "",
        h.value.SELECT,
        h.value.START,
        "",
        "",
        s.value.UP,
        s.value.DOWN,
        s.value.LEFT,
        s.value.RIGHT,
      ],
    })),
    i = new Ae(e);
  return (
    ti(() => {
      i.run();
    }),
    ii(() => {
      i.close();
    }),
    C
  );
}
const De = () => ei(),
  be = ["width", "height"],
  Ie = {
    style: {
      position: "absolute",
      top: "0",
      left: "0%",
      "background-color": "#000",
      width: "100%",
      height: "100%",
    },
  },
  Ne = { name: "NesVue" },
  Fe = /* @__PURE__ */ Ei({
    ...Ne,
    name: "NesVue",
    props: {
      url: {},
      autoStart: { type: Boolean, default: !1 },
      width: { default: "256px" },
      height: { default: "240px" },
      label: { default: "Game Start" },
      gain: { default: 100 },
      noClip: { type: Boolean, default: !1 },
      storage: { type: Boolean, default: !1 },
      debugger: { type: Boolean, default: !1 },
      turbo: { default: 16 },
      dbName: { default: "nes-vue" },
      p1: { default: () => Dt },
      p2: { default: () => bt },
    },
    emits: [
      "fps",
      "success",
      "error",
      "saved",
      "loaded",
      "update:url",
      "removed",
    ],
    setup(a, { expose: h, emit: s }) {
      const t = a,
        o = s;
      if (!t.url) throw "nes-vue missing props: url.";
      const e = Ce(t),
        i = De(),
        r = ei(!0),
        n = Li(t.dbName, "save_data");
      let u = !1,
        l;
      function f(c) {
        return (
          (c.message = `[nes-vue] ${c.message}`),
          t.debugger && console.error(c.message),
          o("error", c),
          !1
        );
      }
      Ti(() => {
        m.ppu.clipToTvSize = !t.noClip;
      });
      function p(c) {
        e(c.code, 65);
      }
      function R(c) {
        e(c.code, 64);
      }
      function b() {
        document.addEventListener("keydown", p),
          document.addEventListener("keyup", R);
      }
      function N() {
        document.removeEventListener("keydown", p),
          document.removeEventListener("keyup", R);
      }
      function A(c = t.url) {
        if (st(i.value)) return;
        if (
          (r.value ? (r.value = !1) : (Jt(), Ht(), clearInterval(l)),
          c !== t.url)
        ) {
          (F.buffer = null), o("update:url", c);
          return;
        }
        ie(i.value),
          new Promise((d, q) => {
            function Et(O) {
              try {
                m.loadROM(O),
                  (l = window.setInterval(() => {
                    const Tt = m.getFPS();
                    o("fps", Tt || 0);
                  }, 1e3)),
                  d("success");
              } catch {
                q({
                  code: 0,
                  message: `${c} loading Error: Probably the ROM is unsupported.`,
                }),
                  (r.value = !0);
              }
            }
            if (_e(F.buffer)) Et(F.buffer);
            else {
              const O = new XMLHttpRequest();
              O.open("GET", c),
                O.overrideMimeType("text/plain; charset=x-user-defined"),
                (O.onerror = () => {
                  q({
                    code: 404,
                    message: `${c} loading Error: ${O.statusText}`,
                  });
                }),
                (O.onload = function () {
                  this.status === 200
                    ? ((F.buffer = this.responseText), Et(F.buffer))
                    : q({
                        code: 404,
                        message: `${c} loading Error: ${O.statusText}`,
                      });
                }),
                O.send();
            }
            i.value && Yt(i.value), b();
          }).then(
            () => {
              ue(), o("success");
            },
            (d) => (f(d), d)
          );
      }
      function g() {
        m.videoMode && It(),
          r.value || M(),
          u && (u = !1),
          L.init(),
          t.url && A();
      }
      function M() {
        r.value ||
          (Jt(), Ht(), clearInterval(l), m.reset(), L.init(), (r.value = !0));
      }
      function S(c) {
        return c === void 0
          ? f({
              code: 4,
              message: "TypeError: id is undefined.",
            })
          : !1;
      }
      function P(c) {
        re(c, f, t.url);
      }
      function E(c) {
        if (!S(c))
          try {
            localStorage.setItem(c, JSON.stringify(Zt(t.url))),
              o("saved", {
                id: c,
                message: "The state has been saved in localStorage",
                target: "localStorage",
              });
          } catch (_) {
            if (_.name === "QuotaExceededError")
              return f({
                code: 1,
                message: "Save Error: localStorage out of memory.",
              });
          }
      }
      function T(c) {
        if (S(c)) return;
        const _ = localStorage.getItem(c);
        if (!_)
          return f({
            code: 2,
            message: "Load Error: nothing to load.",
          });
        P(JSON.parse(_)),
          o("loaded", {
            id: c,
            message: "Loaded state from localStorage",
            target: "localStorage",
          });
      }
      function v(c) {
        if (!S(c))
          try {
            n.set_item(c, Zt(t.url));
          } catch {
            f({
              code: 1,
              message: "Save Error: Unable to save data to indexedDB.",
            });
          }
      }
      function fi(c) {
        S(c) ||
          n.get_item(c).then((_) => {
            P(_);
          });
      }
      function ci(c) {
        if (!S(c)) {
          if (!m.cpu.irqRequested || r.value)
            return f({
              code: 1,
              message:
                "Save Error: Can only be saved while the game is running.",
            });
          t.storage ? E(c) : v(c);
        }
      }
      function mi(c) {
        if (!S(c)) {
          if (!m.cpu.irqRequested || r.value)
            return f({
              code: 2,
              message:
                "Load Error: Can only be loaded when the game is running.",
            });
          t.storage ? T(c) : fi(c), u && Nt();
        }
      }
      function Ri(c) {
        S(c) || (t.storage ? localStorage.removeItem(c) : n.remove_item(c));
      }
      function _i() {
        n.clear();
      }
      function xi(c, _) {
        if (!i.value || r.value) return;
        const d = ee(i.value);
        return c && Se(i.value, _), d;
      }
      function ht() {
        if (de(G, !1)) {
          f({
            code: 3,
            message: "FM2 Error: No fm2 scripts found.",
          });
          return;
        }
        g(), (m.videoMode = !0), N();
      }
      async function di(c, _ = 0) {
        try {
          const q = await (await fetch(c)).text();
          Ut(q, _);
        } catch (d) {
          return (
            f({
              code: 4,
              message: "FM2 Error: Unable to load fm2 file.",
            }),
            Promise.reject(d)
          );
        }
        return ht;
      }
      function It() {
        (m.videoMode = !1),
          (m.controllers[1].state = D(8, 64)),
          (m.controllers[2].state = D(8, 64)),
          b();
      }
      function Si(c, _ = 0) {
        return Ut(c, _), Promise.resolve(ht);
      }
      function gi(c) {
        L.parse(c);
      }
      function Ai(c) {
        L.disable(c);
      }
      function Ci() {
        L.init();
      }
      function Di() {
        (u = !0), pe();
      }
      function Nt() {
        (u = !1), fe();
      }
      const bi = J(() => {
        const c = /^\d*$/;
        let _ = t.width,
          d = t.height;
        return (
          Oi(() => {
            i.value && Yt(i.value);
          }),
          c.test(String(_)) && (_ += "px"),
          c.test(String(d)) && (d += "px"),
          `width: ${_};height: ${d};background-color: #000;margin: auto;position: relative;overflow: hidden;`
        );
      });
      return (
        H(
          () => t.url,
          () => {
            (F.buffer = null), g();
          }
        ),
        H(
          () => t.gain,
          () => {
            zt(t.gain);
          }
        ),
        ti(() => {
          (F.buffer = null), t.autoStart && A(), zt(t.gain);
        }),
        ii(() => {
          N(), M();
        }),
        h({
          start: A,
          reset: g,
          stop: M,
          pause: Di,
          play: Nt,
          save: ci,
          load: mi,
          remove: Ri,
          clear: _i,
          screenshot: xi,
          fm2URL: di,
          fm2Text: Si,
          fm2Play: ht,
          fm2Stop: It,
          cheatCode: gi,
          cancelCheatCode: Ai,
          cancelCheatCodeAll: Ci,
          // memory,
          // prev,
          // next,
        }),
        (c, _) => (
          Ot(),
          Ft(
            "div",
            {
              style: Fi(bi.value),
            },
            [
              Mt(
                "canvas",
                {
                  ref_key: "cvs",
                  ref: i,
                  width: yt(it),
                  height: yt(et),
                  style: { display: "inline-block" },
                },
                null,
                8,
                be
              ),
              Mi(Mt("div", Ie, null, 512), [[yi, r.value]]),
              r.value
                ? (Ot(),
                  Ft(
                    "div",
                    {
                      key: 0,
                      style: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        cursor: "pointer",
                        color: "#f8f4ed",
                        "font-size": "20px",
                      },
                      onClick: _[0] || (_[0] = (d) => A()),
                    },
                    Pi(c.label),
                    1
                  ))
                : vi("", !0),
            ],
            4
          )
        )
      );
    },
  }),
  I = {};
function k(a, h, s, t, o) {
  a.addEventListener(s, t, o),
    (I[h] = I[h] || {}),
    (I[h][s] = I[h][s] || []),
    I[h][s].push(t);
}
function Ee(a, h) {
  I[h] &&
    (ui(I[h]).forEach((s) => {
      I[h][s].forEach((t) => {
        a.removeEventListener(s, t);
      }),
        delete I[h][s];
    }),
    delete I[h]);
}
function Qt(a) {
  return (
    typeof a == "string" && (a = [a]),
    Array.from(new Set(a))
      .map((h) => h.toUpperCase())
      .sort()
  );
}
const Me = (a, h) => {
  if (!h.value) throw "[nes-vue] v-gamepad value is required";
  const s = (h.arg ?? "").toLowerCase(),
    t = h.modifiers.p2 || h.modifiers.P2,
    o = t ? bt : Dt;
  if (h.oldValue) {
    const r = Qt(h.oldValue).filter((u) => jt(u, o)),
      n = `gamepad-${`${s + (t ? "p2" : "p1")}-${r.join("-")}`}`;
    Ee(a, n);
  }
  const e = Qt(h.value).filter((r) => jt(r, o)),
    i = `gamepad-${`${s + (t ? "p2" : "p1")}-${e.join("-")}`}`;
  e.length &&
    (s === "touch"
      ? (k(a, i, "touchstart", () => {
          e.forEach((r) => {
            C(o[r], 65);
          });
        }),
        k(a, i, "touchend", () => {
          e.forEach((r) => {
            C(o[r], 64);
          });
        }),
        k(a, i, "touchcancel", () => {
          e.forEach((r) => {
            C(o[r], 64);
          });
        }))
      : (k(a, i, "mousedown", () => {
          e.forEach((r) => {
            C(o[r], 65);
          });
        }),
        k(a, i, "mouseup", () => {
          e.forEach((r) => {
            C(o[r], 64);
          });
        }),
        k(a, i, "mouseleave", () => {
          e.forEach((r) => {
            C(o[r], 64);
          });
        }),
        s &&
          s !== "mouse" &&
          console.warn(
            "[nes-vue] argument should be mouse or touch, changed to default: mouse"
          )));
};
export { Fe as NesVue, m as nes, Me as vGamepad };
