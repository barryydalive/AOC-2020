const fs = require('fs')

let input = fs.readFileSync('./day4input.txt', 'utf8').split('\n\n')
let count = 0
const passports = input.map(passport => {
  const fields = passport.replace(/\n/g,' ').split(' ')
  const data = {}
  fields.forEach(field => {
    const [fieldName, entry] = field.split(':')

    data[fieldName] = entry
  })
  if(data['byr'] && data['iyr'] && data['eyr'] && data['hgt'] && data['hcl'] && data['ecl'] && data['pid']) count++
  return data
})

console.log('part1',count)

count = 0

passports.forEach(({byr,iyr,eyr,hgt,hcl,ecl,pid,cid}) => {
  if(!byr || byr.length < 4 || byr.length > 4 || Number(byr) < 1920 || Number(byr) > 2002) return
  if(!iyr || iyr.length < 4 || iyr.length > 4 || Number(iyr) < 2010 || Number(iyr) > 2020) return
  if(!eyr || eyr.length < 4 || eyr.length > 4 || Number(eyr) < 2020 || Number(eyr) > 2030) return

  if(!hgt) return
  const hgtUnit = hgt.slice(hgt.length - 2, hgt.length)
  hgt = Number(hgt.slice(0, hgt.length - 2))
  if(hgtUnit === 'cm'){
    if(hgt < 150 || hgt > 193) return
  } else if(hgtUnit === 'in'){
    if(hgt < 59 || hgt > 76) return
  } else return

  if(hcl[0] !== '#' || hcl.length !==7 || hcl.slice(1).match(/[^a-f0-9]/))return
  const eyeColors = {
    amb:true,
    blu:true,
    brn:true,
    gry:true,
    grn:true,
    hzl:true,
    oth:true
  }
  if(!ecl || !eyeColors[ecl]) return
  if(!pid || pid.length !== 9 || pid.match(/[^0-9]/)) return 

  count++
})

console.log('part2',count)