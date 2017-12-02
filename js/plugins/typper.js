$gameTroop.turnCount()

Eval $gameTroop.turnCount()%3 == 1: Skill 36
Eval user.hpRate() <= 0.35: Skill 38
Random 30%: Skill 40, Heighest pdm
Random 40%: Skill 37
Always: Skill 39


//通用药师AI
hp% param <= 50%: Skill 49, Lowest hp
hp% param <= 20%: Skill 48, Lowest hp
state === state 7: Skill 44
state === state 8: Skill 45
state === state 10: Skill 47
state === state 4: Skill 50
Random 50%: Skill 61
party alive members >= 3: Skill 63
Always: Skill 60


Random 25%: Skill 55
Random 40%: Skill 56
Random 60%: Skill 58
Random 90%: Skill 59