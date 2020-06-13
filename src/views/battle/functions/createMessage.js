export default function createMessage(actionObject, game){
    const superStatements = {
        p1Super: `${game.player1.username} activated their Super-Crystal!`,
        p2Super: `${game.player2.username} activated their Super-Crystal!`
    }
    let messageArr = [];
    if(actionObject.firstAction === 'player1'){
        // Player 1 acted first
        if(!actionObject.p1Beast && !actionObject.p2Beast){
            // Players select starting beasts
            messageArr = [ actionObject.p1ActionStatement.statement, actionObject.p2ActionStatement.statement ];
            return messageArr;
        }

        if(!actionObject.p1ActionStatement.moveName && !actionObject.p2ActionStatement.moveName){
            // Both Players switched active beasts
            messageArr = [ actionObject.p1ActionStatement.statement, actionObject.p2ActionStatement.statement ];
            return messageArr;
        }

        if(actionObject.p1Super){
            // player 1 activated their super
            if(actionObject.p2Super){
                // player 2 also activated their super
                messageArr.push(superStatements.p1Super);
                messageArr.push(superStatements.p2Super);
            } else {
                // player 2 didn't activate their super
                messageArr.push(superStatements.p1Super);
            }
        }

        if(actionObject.p2Super){
            // player 2 activated super, player 1 did not
            messageArr.push(superStatements.p2Super);
        }

        if(!actionObject.p1ActionStatement.moveName){
            // player 1 switched beasts, player 2 used a move
            messageArr.push(actionObject.p1ActionStatement.statement);
            messageArr.push(`${actionObject.p2Beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`);

            if(actionObject.p2ActionStatement.statement){
                // player 2's move had a secondary effect
                messageArr.push(actionObject.p2ActionStatement.statement);
            }

            if(actionObject.p2ActionStatement.damage){
                // player 2's move dealt damage
                messageArr.push(`It dealt ${Math.round((actionObject.p2ActionStatement.damage / actionObject.p1Beast.init_hp) * 100)}%!`);

                if(actionObject.p2ActionStatement.damage.assistBrace){
                    messageArr.push(`${game.player1.username}'s beast held on at 1 HP thanks to its Assist Brace!`);
                }

                if(actionObject.p1ActionStatement.beastKOd){
                    // player 1's beast was KOd by the damage
                    messageArr.push(actionObject.p1ActionStatement.KOstatement);
                    return messageArr;
                }
                // player 1's beast was not KOd by the damage
                return messageArr;
            }
            // player 2's move dealt no damage
            return messageArr;

        } else {
            // player 1 used a move
            if(actionObject.p2ActionStatement.moveName){
                // player 2 also used a move
                messageArr.push(`${actionObject.p1Beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`)

                if(actionObject.p1ActionStatement.statement){
                    // player 1's move had a secondary effect
                    messageArr.push(actionObject.p1ActionStatement.statement);
                }

                if(actionObject.p1ActionStatement.damage){
                    // player 1's move dealt damage
                    messageArr.push(`It dealt ${Math.round((actionObject.p1ActionStatement.damage / actionObject.p2Beast.init_hp) * 100)}%!`);

                    if(actionObject.p1ActionStatement.damage.assistBrace){
                        messageArr.push(`${game.player2.username}'s beast held on at 1 HP thanks to its Assist Brace!`);
                    }

                    if(actionObject.p2ActionStatement.beastKOd){
                        // player 2's beast was KOd by the damage, and therefore didn't get to attack
                        messageArr.push(actionObject.p2ActionStatement.KOstatement);
                        return messageArr;
                    }
                }

                // player 2's beast was not KOd by the damage and gets to use its move
                messageArr.push(`${actionObject.p2Beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`)

                if(actionObject.p2ActionStatement.statement){
                    // player 2's move had a secondary effect
                    messageArr.push(actionObject.p2ActionStatement.statement);
                }

                if(actionObject.p2ActionStatement.damage){
                    // player 2's move dealt damage
                    messageArr.push(`It dealt ${Math.round((actionObject.p2ActionStatement.damage / actionObject.p1Beast.init_hp) * 100)}%!`);

                    if(actionObject.p2ActionStatement.damage.assistBrace){
                        messageArr.push(`${game.player1.username}'s beast held on at 1 HP thanks to its Assist Brace!`);
                    }

                    if(actionObject.p1ActionStatement.beastKOd){
                        // player 1's beast was KOd by the damage
                        messageArr.push(actionObject.p1ActionStatement.KOstatement);
                        return messageArr;
                    }
                    // player 1's beast was not KOd by the damage
                    return messageArr;
                }
                // player 2's move dealt no damage
                return messageArr;

            } else {
                // player 1 used a move, player 2 switched beasts
                messageArr.push(actionObject.p2ActionStatement.statement);
                messageArr.push(`${actionObject.p1Beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`);

                if(actionObject.p1ActionStatement.statement){
                    // player 1's move had a secondary effect
                    messageArr.push(actionObject.p1ActionStatement.statement);
                }

                if(actionObject.p1ActionStatement.damage){
                    // player 1's move dealt damage
                    messageArr.push(`It dealt ${Math.round((actionObject.p1ActionStatement.damage / actionObject.p2Beast.init_hp) * 100)}%!`);

                    if(actionObject.p1ActionStatement.damage.assistBrace){
                        messageArr.push(`${game.player2.username}'s beast held on at 1 HP thanks to its Assist Brace!`);
                    }

                    if(actionObject.p2ActionStatement.beastKOd){
                        // player 2's beast was KOd by the damage
                        messageArr.push(actionObject.p2ActionStatement.KOstatement);
                        return messageArr;
                    }
                    // player 2's beast was not KOd by the damage
                    return messageArr;
                }
                // player 1's move dealt no damage
                return messageArr;
            }

        }
    }
    else if (actionObject.firstAction === 'player2'){
        // player 2 acted first
        if(actionObject.p2Super){
            // player 1 activated their super
            if(actionObject.p1Super){
                // player 2 also activated their super
                messageArr.push(superStatements.p2Super);
                messageArr.push(superStatements.p1Super);
            } else {
                // player 2 didn't activate their super
                messageArr.push(superStatements.p2Super);
            }
        }

        if(actionObject.p1Super){
            // player 1 activated super, player 2 did not
            messageArr.push(superStatements.p1Super);
        }

        if(!actionObject.p2ActionStatement.moveName){
            // player 2 switched beasts, player 1 used a move
            messageArr.push(actionObject.p2ActionStatement.statement);
            messageArr.push(`${actionObject.p1Beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`);

            if(actionObject.p1ActionStatement.statement){
                // player 1's move had a secondary effect
                messageArr.push(actionObject.p1ActionStatement.statement);
            }

            if(actionObject.p1ActionStatement.damage){
                // player 1's move dealt damage
                messageArr.push(`It dealt ${Math.round((actionObject.p1ActionStatement.damage / actionObject.p2Beast.init_hp) * 100)}%!`);

                if(actionObject.p1ActionStatement.damage.assistBrace){
                    messageArr.push(`${game.player2.username}'s beast held on at 1 HP thanks to its Assist Brace!`);
                }

                if(actionObject.p2ActionStatement.beastKOd){
                    // player 2's beast was KOd by the damage
                    messageArr.push(actionObject.p2ActionStatement.KOstatement);
                    return messageArr;
                }
                // player 2's beast was not KOd by the damage
                return messageArr;
            }
            // player 1's move dealt no damage
            return messageArr;

        } else {
            // player 2 used a move
            if(actionObject.p1ActionStatement.moveName){
                // player 1 also used a move
                messageArr.push(`${actionObject.p2Beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`)

                if(actionObject.p2ActionStatement.statement){
                    // player 2's move had a secondary effect
                    messageArr.push(actionObject.p2ActionStatement.statement);
                }

                if(actionObject.p2ActionStatement.damage){
                    // player 2's move dealt damage
                    messageArr.push(`It dealt ${Math.round((actionObject.p2ActionStatement.damage / actionObject.p1Beast.init_hp) * 100)}%!`);

                    if(actionObject.p2ActionStatement.damage.assistBrace){
                        messageArr.push(`${game.player1.username}'s beast held on at 1 HP thanks to its Assist Brace!`);
                    }

                    if(actionObject.p1ActionStatement.beastKOd){
                        // player 1's beast was KOd by the damage, and therefore didn't get to attack
                        messageArr.push(actionObject.p1ActionStatement.KOstatement);
                        return messageArr;
                    }
                }

                // player 1's beast was not KOd by the damage and gets to use its move
                messageArr.push(`${actionObject.p1Beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`);

                if(actionObject.p1ActionStatement.statement){
                    // player 1's move had a secondary effect
                    messageArr.push(actionObject.p1ActionStatement.statement);
                }

                if(actionObject.p1ActionStatement.damage){
                    // player 1's move dealt damage
                    messageArr.push(`It dealt ${Math.round((actionObject.p1ActionStatement.damage / actionObject.p2Beast.init_hp) * 100)}%!`);

                    if(actionObject.p1ActionStatement.damage.assistBrace){
                        messageArr.push(`${game.player2.username}'s beast held on at 1 HP thanks to its Assist Brace!`);
                    }

                    if(actionObject.p2ActionStatement.beastKOd){
                        // player 2's beast was KOd by the damage
                        messageArr.push(actionObject.p2ActionStatement.KOstatement);
                        return messageArr;
                    }
                    // player 2's beast was not KOd by the damage
                    return messageArr
                }
                // player 1's move dealt no damage
                return messageArr;

            } else {
                // player 2 used a move,  player 1 switched beasts
                messageArr.push(actionObject.p1ActionStatement.statement);
                messageArr.push(`${actionObject.p2Beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`);

                if(actionObject.p2ActionStatement.statement){
                    // player 2's move had a secondary effect
                    messageArr.push(actionObject.p2ActionStatement.statement);
                }

                if(actionObject.p2ActionStatement.damage){
                    // player 2's move dealt damage
                    messageArr.push(`It dealt ${Math.round((actionObject.p2ActionStatement.damage / actionObject.p1Beast.init_hp) * 100)}%!`);

                    if(actionObject.p2ActionStatement.damage.assistBrace){
                        messageArr.push(`${game.player1.username}'s beast held on at 1 HP thanks to its Assist Brace!`);
                    }

                    if(actionObject.p1ActionStatement.beastKOd){
                        // player 1's beast was KOd by the damage
                        messageArr.push(actionObject.p1ActionStatement.KOstatement);
                        return messageArr;
                    }
                    // player 1's beast was not KOd by the damage
                    return messageArr;
                }
                // player 2's move dealt no damage
                return messageArr;
            }
        }
    } else {
        return [ "Error processing first action." ]
    }
}