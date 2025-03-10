import { Color } from './color'

const { objectContaining } = jasmine

describe('Color', () => {
  describe('static', () => {
    describe('invert()', () => {
      it('shoud invert the given hex color', () => {
        expect(Color.invert('#ffffff')).toEqual('#000000')
        expect(Color.invert([255, 255, 255, 1])).toEqual([0, 0, 0, 1])
        expect(Color.invert([100, 100, 100, 1], true)).toEqual([
          255, 255, 255, 1,
        ])
        expect(Color.invert([200, 200, 200, 1], true)).toEqual([0, 0, 0, 1])
      })
    })

    describe('fromHex()', () => {
      it('should return null when the given string is not a valid hex string', () => {
        expect(Color.fromHex('')).toBeNull()
      })
    })

    describe('fromHsl()', () => {
      it('should return null when the given string is not a valid hsla string', () => {
        expect(Color.fromHsl('')).toBeNull()
      })
    })

    describe('fromRgb()', () => {
      it('should return null when the given string is not a valid rgba string', () => {
        expect(Color.fromRgb('')).toBeNull()
      })
    })

    describe('isRgbLike()', () => {
      it('shoud return true if the given object is rgb like', () => {
        expect(Color.isRgbLike({ r: 1, g: 1, b: 1 })).toBeTrue()
        expect(Color.isRgbLike({ r: 1, g: 1, b: 1, a: 0.5 })).toBeTrue()
      })

      it('shoud return false if the given object is not rgb like', () => {
        expect(Color.isRgbLike({ r: 1, g: 1 })).toBeFalse()
        expect(Color.isRgbLike({ r: 1, b: 1, a: 0.5 })).toBeFalse()
      })
    })

    describe('isRgb()', () => {
      it('should return true when the given string is a valid rgba string', () => {
        expect(Color.isRgb('rgb(0,0,0)')).toBeTrue()
        expect(Color.isRgb('rgba(0,0,0,0)')).toBeTrue()
      })

      it('should return false when the given string is a not valid rgba string', () => {
        expect(Color.isRgb('')).toBeFalse()
        expect(Color.isRgb('#000000')).toBeFalse()
        expect(Color.isRgb('hsl(0,0,0)')).toBeFalse()
        expect(Color.isRgb('hsla(0,0,0,0)')).toBeFalse()
      })
    })

    describe('isHsl()', () => {
      it('should return true when the given string is a valid hsla string', () => {
        expect(Color.isHsl('hsl(0,0,0)')).toBeTrue()
        expect(Color.isHsl('hsla(0,0,0,0)')).toBeTrue()
      })

      it('should return false when the given string is a not valid hsla string', () => {
        expect(Color.isHsl('')).toBeFalse()
        expect(Color.isHsl('#000000')).toBeFalse()
        expect(Color.isHsl('rgb(0,0,0)')).toBeFalse()
        expect(Color.isHsl('rgba(0,0,0,0)')).toBeFalse()
      })
    })

    describe('isHex()', () => {
      it('should return true when the given string is a valid hex string', () => {
        expect(Color.isHex('#000')).toBeTrue()
        expect(Color.isHex('#000000')).toBeTrue()
      })

      it('should return false when the given string is a not valid hex string', () => {
        expect(Color.isHex('')).toBeFalse()
        expect(Color.isHex('#0000')).toBeFalse()
        expect(Color.isHex('#0000000')).toBeFalse()
        expect(Color.isHex('rgb(0,0,0)')).toBeFalse()
        expect(Color.isHex('rgba(0,0,0,0)')).toBeFalse()
        expect(Color.isHex('hsl(0,0,0)')).toBeFalse()
        expect(Color.isHex('hsla(0,0,0,0)')).toBeFalse()
      })
    })

    describe('isColor()', () => {
      it('should return true when the given value is a color', () => {
        expect(Color.isColor('#000')).toBeTrue()
        expect(Color.isColor('#000000')).toBeTrue()
        expect(Color.isColor('rgb(0,0,0)')).toBeTrue()
        expect(Color.isColor('rgba(0,0,0,0)')).toBeTrue()
        expect(Color.isColor('hsl(0,0,0)')).toBeTrue()
        expect(Color.isColor('hsla(0,0,0,0)')).toBeTrue()
        expect(Color.isColor({ r: 0, g: 0, b: 0, a: 0 })).toBeTrue()
      })

      it('should return false when the given string is a not color', () => {
        expect(Color.isColor('')).toBeFalse()
        expect(Color.isColor(null)).toBeFalse()
        expect(Color.isColor({})).toBeFalse()
        expect(Color.isColor(false)).toBeFalse()
        expect(Color.isColor(1)).toBeFalse()
        expect(Color.isColor({ a: 0 })).toBeFalse()
      })
    })
  })

  describe('constructor', () => {
    it('shoud create a Color with default args', () => {
      const color = new Color()
      expect(color.r).toBe(255)
      expect(color.g).toBe(255)
      expect(color.b).toBe(255)
      expect(color.a).toBe(1)
    })

    it('shoud create a Color from named color', () => {
      const black = new Color(Color.presets.black)
      expect(black.r).toBe(0)
      expect(black.g).toBe(0)
      expect(black.b).toBe(0)
      expect(black.a).toBe(1)

      const white = new Color('white')
      expect(white.r).toBe(255)
      expect(white.g).toBe(255)
      expect(white.b).toBe(255)
      expect(black.a).toBe(1)
    })

    it('should create a Color from hex string', () => {
      const black = new Color('#000000')
      expect(black.r).toBe(0)
      expect(black.g).toBe(0)
      expect(black.b).toBe(0)
      expect(black.a).toBe(1)

      const white = new Color('#fff')
      expect(white.r).toBe(255)
      expect(white.g).toBe(255)
      expect(white.b).toBe(255)
      expect(black.a).toBe(1)
    })

    it('should create a Color from rgb string', () => {
      expect(new Color('rgb(255,255,255)')).toEqual(
        objectContaining({ r: 255, g: 255, b: 255, a: 1 }),
      )
    })

    it('should create a Color from rgba string', () => {
      expect(new Color('rgba(255,255,255,0.5)')).toEqual(
        objectContaining({ r: 255, g: 255, b: 255, a: 0.5 }),
      )
    })

    it('should create a Color from hsl string', () => {
      expect(new Color('hsl(10,10,10)')).toEqual(
        objectContaining({ r: 28, g: 24, b: 23, a: 1 }),
      )
    })

    it('should create a Color from hsla string', () => {
      expect(new Color('hsl(10,10,10,0.5)')).toEqual(
        objectContaining({ r: 28, g: 24, b: 23, a: 0.5 }),
      )
    })

    it('should not parse invalid string', () => {
      const color = new Color('')
      expect(color.r).toBeUndefined()
      expect(color.g).toBeUndefined()
      expect(color.b).toBeUndefined()
      expect(color.a).toBeUndefined()
    })

    it('should create a Color from rgba array', () => {
      const black = new Color([0, 0, 0, 1])
      expect(black.r).toBe(0)
      expect(black.g).toBe(0)
      expect(black.b).toBe(0)
      expect(black.a).toBe(1)
    })

    it('should create a Color from rgba values', () => {
      const black = new Color(-1, 0, 300, 1)
      expect(black.r).toBe(0)
      expect(black.g).toBe(0)
      expect(black.b).toBe(255)
      expect(black.a).toBe(1)
    })

    it('should create a Color from rgba like Object', () => {
      const color1 = new Color({ r: 1, g: 1, b: 1 })
      expect(color1.r).toBe(1)
      expect(color1.g).toBe(1)
      expect(color1.b).toBe(1)
      expect(color1.a).toBe(1)

      const color2 = new Color({ r: 1, g: 1, b: 1, a: 0.5 })
      expect(color2.r).toBe(1)
      expect(color2.g).toBe(1)
      expect(color2.b).toBe(1)
      expect(color2.a).toBe(0.5)
    })
  })

  describe('randomHex()', () => {
    it('shoud return valid random hex value', () => {
      expect(Color.randomHex()).toMatch(/^#[0-9A-F]{6}/)
    })
  })

  describe('randomRGBA()', () => {
    it('shoud generate an rgba color string', () => {
      expect(Color.randomRgb().startsWith('rgba')).toBe(true)
      expect(Color.randomRgb(true).startsWith('rgba')).toBe(true)
    })
  })

  describe('invert()', () => {
    it('shoud return invert value of a color value', () => {
      expect(Color.invert('#ffffff', false)).toBe('#000000')
      expect(Color.invert('#000', false)).toBe('#ffffff')
      expect(Color.invert('234567', false)).toBe('dcba98')
    })

    it('decide font color in white or black depending on background color', () => {
      expect(Color.invert('#121212', true)).toBe('#ffffff')
      expect(Color.invert('#feeade', true)).toBe('#000000')
    })

    it('shoud throw exception with invalid color value', () => {
      expect(() => {
        Color.invert('#abcd', false)
      }).toThrowError('Invalid hex color.')
    })
  })

  describe('blend()', () => {
    it('should generate a blend color', () => {
      expect(new Color().blend(new Color(), new Color(0, 0, 0, 1), 50)).toEqual(
        objectContaining({ r: 0, g: 0, b: 0, a: 1 }),
      )
    })
  })

  describe('lighten()', () => {
    it('should generate a lighten color', () => {
      expect(new Color().lighten(10)).toEqual(
        objectContaining({ r: 255, g: 255, b: 255, a: 1 }),
      )
    })
  })

  describe('darken()', () => {
    it('should generate a darken color', () => {
      expect(new Color().darken(10)).toEqual(
        objectContaining({ r: 245, g: 245, b: 245, a: 1 }),
      )

      expect(Color.darken('#ffffff', 10)).toEqual('#f5f5f5')
    })
  })

  describe('toHex()', () => {
    it('should convert to hex string', () => {
      expect(new Color().toHex()).toEqual('#ffffff')
      expect(new Color(0, 0, 0).toHex()).toEqual('#000000')
    })
  })

  describe('toRGBA()', () => {
    it('should convert to rgba array', () => {
      expect(new Color().toRGBA()).toEqual([255, 255, 255, 1])
    })
  })

  describe('toHSLA()', () => {
    it('should convert to hsla array', () => {
      expect(new Color().toHSLA()).toEqual([0, 0, 255, 1])
    })
  })

  describe('toGrey()', () => {
    it('should convert to gray color', () => {
      expect(new Color().toGrey()).toEqual(
        objectContaining({ r: 255, g: 255, b: 255, a: 1 }),
      )
    })
  })

  describe('toCSS()', () => {
    it('should convert color to rgba css string', () => {
      expect(new Color().toCSS()).toBe('rgba(255,255,255,1)')
    })

    it('should ingore alpha', () => {
      expect(new Color().toCSS(true)).toBe('rgb(255,255,255)')
    })
  })

  describe('clone()', () => {
    it('should clone a color', () => {
      const color1 = new Color()
      const clone1 = color1.clone()
      expect(clone1).not.toBe(color1)
      expect(clone1.r).toBe(255)
      expect(clone1.g).toBe(255)
      expect(clone1.b).toBe(255)
      expect(clone1.a).toBe(1)

      const color2 = new Color(4, 3, 2, 1)
      const clone2 = color2.clone()
      expect(clone2).not.toBe(color2)
      expect(clone2.r).toBe(4)
      expect(clone2.g).toBe(3)
      expect(clone2.b).toBe(2)
      expect(clone2.a).toBe(1)
    })
  })

  describe('toJSON()', () => {
    it('should create an object representation of Color', () => {
      const obj1 = new Color().toJSON()
      expect(obj1.r).toBe(255)
      expect(obj1.g).toBe(255)
      expect(obj1.b).toBe(255)
      expect(obj1.a).toBe(1)

      const obj2 = new Color(4, 3, 2, 1).toJSON()
      expect(obj2.r).toBe(4)
      expect(obj2.g).toBe(3)
      expect(obj2.b).toBe(2)
      expect(obj2.a).toBe(1)
    })
  })

  describe('toArray()', () => {
    it('should convert color to rgba array', () => {
      expect(new Color().toArray()).toEqual([255, 255, 255, 1])
    })
  })

  describe('toString()', () => {
    it('should convert color to rgba string', () => {
      expect(new Color().toCSS()).toBe('rgba(255,255,255,1)')
    })
  })

  describe('valueOf()', () => {
    it('should return a rgba array', () => {
      expect(new Color().valueOf()).toEqual([255, 255, 255, 1])
    })
  })
})
