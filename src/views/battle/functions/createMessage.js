export default function createMessage(actionObject, game){
    // Should generate an array with 1-9 action messages to iterate over and add to the chat log.
    if(actionObject.firstAction === 'player1'){
        if(actionObject.p1Super && actionObject.p2Super){
            // p1 and p2 both activate super, p1 goes first
            const firstAction = `${game.player1.username} activated their Super-Crystal!`;
            const secondAction = `${game.player2.username} activated their Super-Crystal!`;
            if(actionObject.p1ActionStatement.moveName){
                // p1 used a move
                const thirdAction = `${game.player1.team.active_slot.beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`;
                if(actionObject.p1ActionStatement.damage){
                    // p1's move dealt damage
                    if(actionObject.p2ActionStatement.beastKOd){
                        // p2's beast was KOd
                        const fourthAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                        if(actionObject.p1ActionStatement.statement){
                            // p1's action had an additional print statement
                            const fifthAction = actionObject.p1ActionStatement.statement;
                            const sixthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                        } else {
                            // p1's action had no additional print statment
                            const fifthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                        }
                    } else {
                        // p2's beast was not KOd
                        const fourthAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%!`;
                        if(actionObject.p1ActionStatement.statement){
                            // p1's move had an additional print statement
                            const fifthAction = actionObject.p1ActionStatement.statement;
                            if(actionObject.p2ActionStatement.moveName){
                                // p2 used a move
                                const sixthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                                if(actionObject.p2ActionStatement.damage){
                                    // p2's move dealt damage
                                    if(actionObject.p1ActionStatement.beastKOd){
                                        // p1's beast was KOd
                                        const seventhAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const eigthAction = actionObject.p2ActionStatement.statement;
                                            const ninthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction, ninthAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            const eigthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction]
                                        }
                                    } else {
                                        // p1's beast was not KOd
                                        const seventhAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const eigthAction = actionObject.p2ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                        }
                                    }
                                }
                            } else {
                                // p2 didn't use a move
                                const sixthAction = actionObject.p2ActionStatement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                            }
                        } else {
                            // p1's move had no additional print statement
                            if(actionObject.p2ActionStatement.moveName){
                                // p2 used a move
                                const fifthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                                if(actionObject.p2ActionStatement.damage){
                                    // p2's move dealt damage
                                    if(actionObject.p1ActionStatement.beastKOd){
                                        // p1's beast was KOd
                                        const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const seventhAction = actionObject.p2ActionStatement.statement;
                                            const eigthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            const seventhAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction]
                                        }
                                    } else {
                                        // p1's beast was not KOd
                                        const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const seventhAction = actionObject.p2ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction]
                                        } else {
                                            // p2's action had no additional print statement
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                        }
                                    }
                                }
                            } else {
                                // p2 didn't use a move
                                const fifthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                            }
                        }
                    }
                } else {
                    // p1's move didn't deal damage
                    if(actionObject.p1ActionStatement.statement){
                        // p1's move had a print statement
                        const fourthAction = actionObject.p1ActionStatement.statement;
                        if(actionObject.p2ActionStatement.moveName){
                            // p2 used a move
                            const fifthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                            if(actionObject.p2ActionStatement.damage){
                                // p2's move dealt damage
                                if(actionObject.p1ActionStatement.beastKOd){
                                    // p1's beast was KOd
                                    const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const seventhAction = actionObject.p2ActionStatement.statement;
                                        const eigthAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        const seventhAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction]
                                    }
                                } else {
                                    // p1's beast was not KOd
                                    const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const seventhAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                    }
                                }
                            }
                        } else {
                            // p2 didn't use a move
                            const fifthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                        }
                    } else {
                        // p1's move dealt no damage and had no print statement therefore it likely failed.
                        const fourthAction = `${game.player1.team.active_slot.beast.beast_name}'s move failed!`
                        if(actionObject.p2ActionStatement.moveName){
                            // p2 used a move
                            const fifthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                            if(actionObject.p2ActionStatement.damage){
                                // p2's move dealt damage
                                if(actionObject.p1ActionStatement.beastKOd){
                                    // p1's beast was KOd
                                    const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const seventhAction = actionObject.p2ActionStatement.statement;
                                        const eigthAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        const seventhAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction]
                                    }
                                } else {
                                    // p1's beast was not KOd
                                    const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const seventhAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                    }
                                }
                            }
                        } else {
                            // p2 didn't use a move
                            const fifthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                        }
                    }
                }
            } else {
                // p1 did not use a move
                const thirdAction = actionObject.p1ActionStatement.statement;
                if(actionObject.p2ActionStatement.moveName){
                    // p2 used a move
                    const fourthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                    if(actionObject.p2ActionStatement.damage){
                        // p2's move dealt damage
                        if(actionObject.p1ActionStatement.beastKOd){
                            // p1's beast was KOd
                            const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                            if(actionObject.p2ActionStatement.statement){
                                // p2's action had an additional print statement
                                const sixthAction = actionObject.p2ActionStatement.statement;
                                const seventhAction = actionObject.p1ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                            } else {
                                // p2's action had no additional print statement
                                const sixthAction = actionObject.p1ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                            }
                        } else {
                            // p1's beast was not KOd
                            const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                            if(actionObject.p2ActionStatement.statement){
                                // p2's action had an additional print statement
                                const sixthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                            } else {
                                // p2's action had no additional print statement
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                            }
                        }
                    }
                } else {
                    // p2 didn't use a move
                    const fourthAction = actionObject.p2ActionStatement.statement;
                    return [firstAction, secondAction, thirdAction, fourthAction];
                }
            }
        }
        else if(actionObject.p1Super && !actionObject.p2Super){
            // p1 activates super, p1 goes first
            const firstAction = `${game.player1.username} activated their Super-Crystal!`;
            if(actionObject.p1ActionStatement.moveName){
                // p1 used a move
                const secondAction = `${game.player1.team.active_slot.beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`;
                if(actionObject.p1ActionStatement.damage){
                    // p1's move dealt damage
                    if(actionObject.p2ActionStatement.beastKOd){
                        // p2's beast was KOd
                        const thirdAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                        if(actionObject.p1ActionStatement.statement){
                            // p1's action had an additional print statement
                            const fourthAction = actionObject.p1ActionStatement.statement;
                            const fifthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                        } else {
                            // p1's action had no additional print statment
                            const fourthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction];
                        }
                    } else {
                        // p2's beast was not KOd
                        const thirdAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%!`;
                        if(actionObject.p1ActionStatement.statement){
                            // p1's move had an additional print statement
                            const fourthAction = actionObject.p1ActionStatement.statement;
                            if(actionObject.p2ActionStatement.moveName){
                                // p2 used a move
                                const fifthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                                if(actionObject.p2ActionStatement.damage){
                                    // p2's move dealt damage
                                    if(actionObject.p1ActionStatement.beastKOd){
                                        // p1's beast was KOd
                                        const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const seventhAction = actionObject.p2ActionStatement.statement;
                                            const eigthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            const seventhAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction]
                                        }
                                    } else {
                                        // p1's beast was not KOd
                                        const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const seventhAction = actionObject.p2ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                        }
                                    }
                                }
                            } else {
                                // p2 didn't use a move
                                const fifthAction = actionObject.p2ActionStatement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                            }
                        } else {
                            // p1's move had no additional print statement
                            if(actionObject.p2ActionStatement.moveName){
                                // p2 used a move
                                const fourthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                                if(actionObject.p2ActionStatement.damage){
                                    // p2's move dealt damage
                                    if(actionObject.p1ActionStatement.beastKOd){
                                        // p1's beast was KOd
                                        const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const sixthAction = actionObject.p2ActionStatement.statement;
                                            const seventhAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            const sixthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                                        }
                                    } else {
                                        // p1's beast was not KOd
                                        const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const sixthAction = actionObject.p2ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                                        } else {
                                            // p2's action had no additional print statement
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                                        }
                                    }
                                }
                            } else {
                                // p2 didn't use a move
                                const fourthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction];
                            }
                        }
                    }
                } else {
                    // p1's move didn't deal damage
                    if(actionObject.p1ActionStatement.statement){
                        // p1's move had a print statement
                        const thirdAction = actionObject.p1ActionStatement.statement;
                        if(actionObject.p2ActionStatement.moveName){
                            // p2 used a move
                            const fourthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                            if(actionObject.p2ActionStatement.damage){
                                // p2's move dealt damage
                                if(actionObject.p1ActionStatement.beastKOd){
                                    // p1's beast was KOd
                                    const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const sixthAction = actionObject.p2ActionStatement.statement;
                                        const seventhAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        const sixthAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                                    }
                                } else {
                                    // p1's beast was not KOd
                                    const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const sixthAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                                    }
                                }
                            }
                        } else {
                            // p2 didn't use a move
                            const fourthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction];
                        }
                    } else {
                        // p1's move dealt no damage and had no print statement therefore it likely failed.
                        const thirdAction = `${game.player1.team.active_slot.beast.beast_name}'s move failed!`
                        if(actionObject.p2ActionStatement.moveName){
                            // p2 used a move
                            const fourthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                            if(actionObject.p2ActionStatement.damage){
                                // p2's move dealt damage
                                if(actionObject.p1ActionStatement.beastKOd){
                                    // p1's beast was KOd
                                    const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const sixthAction = actionObject.p2ActionStatement.statement;
                                        const seventhAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        const sixthAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                                    }
                                } else {
                                    // p1's beast was not KOd
                                    const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const sixthAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                                    }
                                }
                            }
                        } else {
                            // p2 didn't use a move
                            const fourthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction];
                        }
                    }
                }
            } else {
                // p1 did not use a move
                const secondAction = actionObject.p1ActionStatement.statement;
                if(actionObject.p2ActionStatement.moveName){
                    // p2 used a move
                    const thirdAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                    if(actionObject.p2ActionStatement.damage){
                        // p2's move dealt damage
                        if(actionObject.p1ActionStatement.beastKOd){
                            // p1's beast was KOd
                            const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                            if(actionObject.p2ActionStatement.statement){
                                // p2's action had an additional print statement
                                const fifthAction = actionObject.p2ActionStatement.statement;
                                const sixthAction = actionObject.p1ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                            } else {
                                // p2's action had no additional print statement
                                const fifthAction = actionObject.p1ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction]
                            }
                        } else {
                            // p1's beast was not KOd
                            const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                            if(actionObject.p2ActionStatement.statement){
                                // p2's action had an additional print statement
                                const fifthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                            } else {
                                // p2's action had no additional print statement
                                return [firstAction, secondAction, thirdAction, fourthAction];
                            }
                        }
                    }
                } else {
                    // p2 didn't use a move
                    const thirdAction = actionObject.p2ActionStatement.statement;
                    return [firstAction, secondAction, thirdAction];
                }
            }
        }
        else if(!actionObject.p1Super && actionObject.p2Super){
            // p2 activates super, p1 goes first
            const firstAction = `${game.player2.username} activated their Super-Crystal!`;
            if(actionObject.p1ActionStatement.moveName){
                // p1 used a move
                const secondAction = `${game.player1.team.active_slot.beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`;
                if(actionObject.p1ActionStatement.damage){
                    // p1's move dealt damage
                    if(actionObject.p2ActionStatement.beastKOd){
                        // p2's beast was KOd
                        const thirdAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                        if(actionObject.p1ActionStatement.statement){
                            // p1's action had an additional print statement
                            const fourthAction = actionObject.p1ActionStatement.statement;
                            const fifthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                        } else {
                            // p1's action had no additional print statment
                            const fourthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction];
                        }
                    } else {
                        // p2's beast was not KOd
                        const thirdAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%!`;
                        if(actionObject.p1ActionStatement.statement){
                            // p1's move had an additional print statement
                            const fourthAction = actionObject.p1ActionStatement.statement;
                            if(actionObject.p2ActionStatement.moveName){
                                // p2 used a move
                                const fifthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                                if(actionObject.p2ActionStatement.damage){
                                    // p2's move dealt damage
                                    if(actionObject.p1ActionStatement.beastKOd){
                                        // p1's beast was KOd
                                        const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const seventhAction = actionObject.p2ActionStatement.statement;
                                            const eigthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            const seventhAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction]
                                        }
                                    } else {
                                        // p1's beast was not KOd
                                        const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const seventhAction = actionObject.p2ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                        }
                                    }
                                }
                            } else {
                                // p2 didn't use a move
                                const fifthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                            }
                        } else {
                            // p1's move had no additional print statement
                            if(actionObject.p2ActionStatement.moveName){
                                // p2 used a move
                                const fourthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                                if(actionObject.p2ActionStatement.damage){
                                    // p2's move dealt damage
                                    if(actionObject.p1ActionStatement.beastKOd){
                                        // p1's beast was KOd
                                        const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const sixthAction = actionObject.p2ActionStatement.statement;
                                            const seventhAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            const sixthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                                        }
                                    } else {
                                        // p1's beast was not KOd
                                        const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const sixthAction = actionObject.p2ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                                        } else {
                                            // p2's action had no additional print statement
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                                        }
                                    }
                                }
                            } else {
                                // p2 didn't use a move
                                const fourthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction];
                            }
                        }
                    }
                } else {
                    // p1's move didn't deal damage
                    if(actionObject.p1ActionStatement.statement){
                        // p1's move had a print statement
                        const thirdAction = actionObject.p1ActionStatement.statement;
                        if(actionObject.p2ActionStatement.moveName){
                            // p2 used a move
                            const fourthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                            if(actionObject.p2ActionStatement.damage){
                                // p2's move dealt damage
                                if(actionObject.p1ActionStatement.beastKOd){
                                    // p1's beast was KOd
                                    const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const sixthAction = actionObject.p2ActionStatement.statement;
                                        const seventhAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        const sixthAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                                    }
                                } else {
                                    // p1's beast was not KOd
                                    const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const sixthAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                                    }
                                }
                            }
                        } else {
                            // p2 didn't use a move
                            const fourthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction];
                        }
                    } else {
                        // p1's move dealt no damage and had no print statement therefore it likely failed.
                        const thirdAction = `${game.player1.team.active_slot.beast.beast_name}'s move failed!`
                        if(actionObject.p2ActionStatement.moveName){
                            // p2 used a move
                            const fourthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                            if(actionObject.p2ActionStatement.damage){
                                // p2's move dealt damage
                                if(actionObject.p1ActionStatement.beastKOd){
                                    // p1's beast was KOd
                                    const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const sixthAction = actionObject.p2ActionStatement.statement;
                                        const seventhAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        const sixthAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                                    }
                                } else {
                                    // p1's beast was not KOd
                                    const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const sixthAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                                    }
                                }
                            }
                        } else {
                            // p2 didn't use a move
                            const fourthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction];
                        }
                    }
                }
            } else {
                // p1 did not use a move
                const secondAction = actionObject.p1ActionStatement.statement;
                if(actionObject.p2ActionStatement.moveName){
                    // p2 used a move
                    const thirdAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                    if(actionObject.p2ActionStatement.damage){
                        // p2's move dealt damage
                        if(actionObject.p1ActionStatement.beastKOd){
                            // p1's beast was KOd
                            const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                            if(actionObject.p2ActionStatement.statement){
                                // p2's action had an additional print statement
                                const fifthAction = actionObject.p2ActionStatement.statement;
                                const sixthAction = actionObject.p1ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                            } else {
                                // p2's action had no additional print statement
                                const fifthAction = actionObject.p1ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction]
                            }
                        } else {
                            // p1's beast was not KOd
                            const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                            if(actionObject.p2ActionStatement.statement){
                                // p2's action had an additional print statement
                                const fifthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                            } else {
                                // p2's action had no additional print statement
                                return [firstAction, secondAction, thirdAction, fourthAction];
                            }
                        }
                    }
                } else {
                    // p2 didn't use a move
                    const thirdAction = actionObject.p2ActionStatement.statement;
                    return [firstAction, secondAction, thirdAction];
                }
            }
        } else {
            // no supers, p1 goes first
            if(actionObject.p1ActionStatement.moveName){
                // p1 used a move
                const firstAction = `${game.player1.team.active_slot.beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`;
                if(actionObject.p1ActionStatement.damage){
                    // p1's move dealt damage
                    if(actionObject.p2ActionStatement.beastKOd){
                        // p2's beast was KOd
                        const secondAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                        if(actionObject.p1ActionStatement.statement){
                            // p1's action had an additional print statement
                            const thirdAction = actionObject.p1ActionStatement.statement;
                            const fourthAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction];
                        } else {
                            // p1's action had no additional print statment
                            const thirdAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction];
                        }
                    } else {
                        // p2's beast was not KOd
                        const secondAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%!`;
                        if(actionObject.p1ActionStatement.statement){
                            // p1's move had an additional print statement
                            const thirdAction = actionObject.p1ActionStatement.statement;
                            if(actionObject.p2ActionStatement.moveName){
                                // p2 used a move
                                const fourthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                                if(actionObject.p2ActionStatement.damage){
                                    // p2's move dealt damage
                                    if(actionObject.p1ActionStatement.beastKOd){
                                        // p1's beast was KOd
                                        const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const sixthAction = actionObject.p2ActionStatement.statement;
                                            const seventhAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            const sixthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                                        }
                                    } else {
                                        // p1's beast was not KOd
                                        const fifthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const sixthAction = actionObject.p2ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                                        }
                                    }
                                }
                            } else {
                                // p2 didn't use a move
                                const fourthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction];
                            }
                        } else {
                            // p1's move had no additional print statement
                            if(actionObject.p2ActionStatement.moveName){
                                // p2 used a move
                                const thirdAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                                if(actionObject.p2ActionStatement.damage){
                                    // p2's move dealt damage
                                    if(actionObject.p1ActionStatement.beastKOd){
                                        // p1's beast was KOd
                                        const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const fifthAction = actionObject.p2ActionStatement.statement;
                                            const sixthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            const fifthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction]
                                        }
                                    } else {
                                        // p1's beast was not KOd
                                        const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const fifthAction = actionObject.p2ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction]
                                        } else {
                                            // p2's action had no additional print statement
                                            return [firstAction, secondAction, thirdAction, fourthAction];
                                        }
                                    }
                                }
                            } else {
                                // p2 didn't use a move
                                const thirdAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction];
                            }
                        }
                    }
                } else {
                    // p1's move didn't deal damage
                    if(actionObject.p1ActionStatement.statement){
                        // p1's move had a print statement
                        const secondAction = actionObject.p1ActionStatement.statement;
                        if(actionObject.p2ActionStatement.moveName){
                            // p2 used a move
                            const thirdAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                            if(actionObject.p2ActionStatement.damage){
                                // p2's move dealt damage
                                if(actionObject.p1ActionStatement.beastKOd){
                                    // p1's beast was KOd
                                    const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const fifthAction = actionObject.p2ActionStatement.statement;
                                        const sixthAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        const fifthAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction]
                                    }
                                } else {
                                    // p1's beast was not KOd
                                    const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const fifthAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        return [firstAction, secondAction, thirdAction, fourthAction];
                                    }
                                }
                            }
                        } else {
                            // p2 didn't use a move
                            const thirdAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction];
                        }
                    } else {
                        // p1's move dealt no damage and had no print statement therefore it likely failed.
                        const secondAction = `${game.player1.team.active_slot.beast.beast_name}'s move failed!`
                        if(actionObject.p2ActionStatement.moveName){
                            // p2 used a move
                            const thirdAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                            if(actionObject.p2ActionStatement.damage){
                                // p2's move dealt damage
                                if(actionObject.p1ActionStatement.beastKOd){
                                    // p1's beast was KOd
                                    const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const fifthAction = actionObject.p2ActionStatement.statement;
                                        const sixthAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        const fifthAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction]
                                    }
                                } else {
                                    // p1's beast was not KOd
                                    const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                    if(actionObject.p2ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const fifthAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        return [firstAction, secondAction, thirdAction, fourthAction];
                                    }
                                }
                            }
                        } else {
                            // p2 didn't use a move
                            const thirdAction = actionObject.p2ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction];
                        }
                    }
                }
            } else {
                // p1 did not use a move
                const firstAction = actionObject.p1ActionStatement.statement;
                if(actionObject.p2ActionStatement.moveName){
                    // p2 used a move
                    const secondAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                    if(actionObject.p2ActionStatement.damage){
                        // p2's move dealt damage
                        if(actionObject.p1ActionStatement.beastKOd){
                            // p1's beast was KOd
                            const thirdAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                            if(actionObject.p2ActionStatement.statement){
                                // p2's action had an additional print statement
                                const fourthAction = actionObject.p2ActionStatement.statement;
                                const fifthAction = actionObject.p1ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                            } else {
                                // p2's action had no additional print statement
                                const fourthAction = actionObject.p1ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction]
                            }
                        } else {
                            // p1's beast was not KOd
                            const thirdAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                            if(actionObject.p2ActionStatement.statement){
                                // p2's action had an additional print statement
                                const fourthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction];
                            } else {
                                // p2's action had no additional print statement
                                return [firstAction, secondAction, thirdAction];
                            }
                        }
                    }
                } else {
                    // p2 didn't use a move
                    const secondAction = actionObject.p2ActionStatement.statement;
                    return [firstAction, secondAction];
                }
            }
        }
    }
    else if(actionObject.firstAction === 'player2'){
        if(actionObject.p2Super && actionObject.p1Super){
            // p1 and p2 both activate super, p2 goes first
            const firstAction = `${game.player2.username} activated their Super-Crystal!`;
            const secondAction = `${game.player1.username} activated their Super-Crystal!`;
            if(actionObject.p2ActionStatement.moveName){
                // p1 used a move
                const thirdAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                if(actionObject.p2ActionStatement.damage){
                    // p1's move dealt damage
                    if(actionObject.p1ActionStatement.beastKOd){
                        // p2's beast was KOd
                        const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                        if(actionObject.p2ActionStatement.statement){
                            // p1's action had an additional print statement
                            const fifthAction = actionObject.p2ActionStatement.statement;
                            const sixthAction = actionObject.p1ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                        } else {
                            // p1's action had no additional print statment
                            const fifthAction = actionObject.p1ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                        }
                    } else {
                        // p2's beast was not KOd
                        const fourthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                        if(actionObject.p2ActionStatement.statement){
                            // p1's move had an additional print statement
                            const fifthAction = actionObject.p2ActionStatement.statement;
                            if(actionObject.p2ActionStatement.moveName){
                                // p2 used a move
                                const sixthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                                if(actionObject.p2ActionStatement.damage){
                                    // p2's move dealt damage
                                    if(actionObject.p2ActionStatement.beastKOd){
                                        // p1's beast was KOd
                                        const seventhAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const eigthAction = actionObject.p2ActionStatement.statement;
                                            const ninthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction, ninthAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            const eigthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction]
                                        }
                                    } else {
                                        // p1's beast was not KOd
                                        const seventhAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const eigthAction = actionObject.p2ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                        }
                                    }
                                }
                            } else {
                                // p2 didn't use a move
                                const sixthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                            }
                        } else {
                            // p1's move had no additional print statement
                            if(actionObject.p2ActionStatement.moveName){
                                // p2 used a move
                                const fifthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p2ActionStatement.moveName}.`;
                                if(actionObject.p2ActionStatement.damage){
                                    // p2's move dealt damage
                                    if(actionObject.p1ActionStatement.beastKOd){
                                        // p1's beast was KOd
                                        const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const seventhAction = actionObject.p2ActionStatement.statement;
                                            const eigthAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction];
                                        } else {
                                            // p2's action had no additional print statement
                                            const seventhAction = actionObject.p1ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction]
                                        }
                                    } else {
                                        // p1's beast was not KOd
                                        const sixthAction = `It dealt ${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%!`;
                                        if(actionObject.p2ActionStatement.statement){
                                            // p2's action had an additional print statement
                                            const seventhAction = actionObject.p2ActionStatement.statement;
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction]
                                        } else {
                                            // p2's action had no additional print statement
                                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                        }
                                    }
                                }
                            } else {
                                // p2 didn't use a move
                                const fifthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                            }
                        }
                    }
                } else {
                    // p1's move didn't deal damage
                    if(actionObject.p2ActionStatement.statement){
                        // p1's move had a print statement
                        const fourthAction = actionObject.p2ActionStatement.statement;
                        if(actionObject.p1ActionStatement.moveName){
                            // p2 used a move
                            const fifthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`;
                            if(actionObject.p1ActionStatement.damage){
                                // p2's move dealt damage
                                if(actionObject.p2ActionStatement.beastKOd){
                                    // p1's beast was KOd
                                    const sixthAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                    if(actionObject.p1ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const seventhAction = actionObject.p1ActionStatement.statement;
                                        const eigthAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        const seventhAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction]
                                    }
                                } else {
                                    // p1's beast was not KOd
                                    const sixthAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%!`;
                                    if(actionObject.p1ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const seventhAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                    }
                                }
                            }
                        } else {
                            // p2 didn't use a move
                            const fifthAction = actionObject.p1ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                        }
                    } else {
                        // p1's move dealt no damage and had no print statement therefore it likely failed.
                        const fourthAction = `${game.player2.team.active_slot.beast.beast_name}'s move failed!`
                        if(actionObject.p1ActionStatement.moveName){
                            // p2 used a move
                            const fifthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`;
                            if(actionObject.p1ActionStatement.damage){
                                // p2's move dealt damage
                                if(actionObject.p2ActionStatement.beastKOd){
                                    // p1's beast was KOd
                                    const sixthAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                                    if(actionObject.p1ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const seventhAction = actionObject.p1ActionStatement.statement;
                                        const eigthAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction, eigthAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        const seventhAction = actionObject.p2ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction]
                                    }
                                } else {
                                    // p1's beast was not KOd
                                    const sixthAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%!`;
                                    if(actionObject.p1ActionStatement.statement){
                                        // p2's action had an additional print statement
                                        const seventhAction = actionObject.p1ActionStatement.statement;
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                                    } else {
                                        // p2's action had no additional print statement
                                        return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                                    }
                                }
                            }
                        } else {
                            // p2 didn't use a move
                            const fifthAction = actionObject.p1ActionStatement.statement;
                            return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                        }
                    }
                }
            } else {
                // p1 did not use a move
                const thirdAction = actionObject.p2ActionStatement.statement;
                if(actionObject.p1ActionStatement.moveName){
                    // p2 used a move
                    const fourthAction = `${game.player2.team.active_slot.beast.beast_name} used ${actionObject.p1ActionStatement.moveName}.`;
                    if(actionObject.p1ActionStatement.damage){
                        // p2's move dealt damage
                        if(actionObject.p1ActionStatement.beastKOd){
                            // p1's beast was KOd
                            const fifthAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%!`;
                            if(actionObject.p1ActionStatement.statement){
                                // p2's action had an additional print statement
                                const sixthAction = actionObject.p1ActionStatement.statement;
                                const seventhAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction, seventhAction];
                            } else {
                                // p2's action had no additional print statement
                                const sixthAction = actionObject.p2ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction]
                            }
                        } else {
                            // p1's beast was not KOd
                            const fifthAction = `It dealt ${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%!`;
                            if(actionObject.p1ActionStatement.statement){
                                // p2's action had an additional print statement
                                const sixthAction = actionObject.p1ActionStatement.statement;
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction, sixthAction];
                            } else {
                                // p2's action had no additional print statement
                                return [firstAction, secondAction, thirdAction, fourthAction, fifthAction];
                            }
                        }
                    }
                } else {
                    // p2 didn't use a move
                    const fourthAction = actionObject.p1ActionStatement.statement;
                    return [firstAction, secondAction, thirdAction, fourthAction];
                }
            }
        }
        else if(actionObject.p2Super && !actionObject.p1Super){
            // p1 activates super, p2 goes first
            const firstAction = `${game.player1.username} activated their Super-Crystal!`;
        }
        else if(!actionObject.p2Super && actionObject.p1Super){
            // p2 activates super, p2 goes first
            const firstAction = `${game.player2.username} activated their Super-Crystal!`;
        } else {
            // no supers, p2 goes first
        }
    } else {
        return {
            firstAction: 'Error processing first action.'
        }
    }
}

if(message.actions){

                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p1ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>
                    }
                    {message.p2ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p1ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p2ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>}
                </div>
            )
        }
        else if(message.p2Super && !message.p1Super){
            return (
                <div key={index}>
                    <div>
                        <p className={classes.messageText}>{game.player1.username} activated their Super-Crystal!</p>
                    </div>
                    {message.p1ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p1ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>
                    }
                    {message.p2ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p1ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p2ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>}
                </div>
            )
        }
        else if(!message.p2Super && message.p1Super){
            return (
                <div key={index}>
                    <div>
                        <p className={classes.messageText}>{game.player1.username} activated their Super-Crystal!</p>
                    </div>
                    {message.p1ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p1ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>
                    }
                    {message.p2ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p1ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p2ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>}
                </div>
            )
        }
        else if(!message.p2Super && !message.p1Super){
            console.log(message)
            return (
                <div key={index}>
                    {message.p1ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p1ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>
                    }
                    {message.p2ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p1ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p2ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>}
                </div>
            )
        } else {
            return (
                <div key={index}>
                    <p className={classes.messageText}>Error reading last action based on Super Activation. Player 1 went first.</p>
                </div>
            )
        }
    }
    else if(message.firstAction === 'player2'){
        if(message.p1Super && message.p2Super){
            return (
                <div key={index}>
                    <div>
                        <p className={classes.messageText}>{game.player2.username} activated their Super-Crystal!</p>
                    </div>
                    <div>
                        <p className={classes.messageText}>{game.player1.username} activated their Super-Crystal!</p>
                    </div>
                    {message.p2ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p1ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p2ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>}
                    {message.p1ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p1ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>
                    }
                </div>
            )
        }
        else if(!message.p1Super && message.p2Super){
            return (
                <div key={index}>
                    <div>
                        <p className={classes.messageText}>{game.player2.username} activated their Super-Crystal!</p>
                    </div>
                    {message.p2ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p1ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p2ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>}
                    {message.p1ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p1ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>
                    }
                </div>
            )
        }
        else if(message.p1Super && !message.p2Super){
            return (
                <div key={index}>
                    <div>
                        <p className={classes.messageText}>{game.player1.username} activated their Super-Crystal!</p>
                    </div>
                    {message.p2ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p1ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p2ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>}
                    {message.p1ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p1ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>
                    }
                </div>
            )
        }
        else if(!message.p1Super && !message.p2Super){
            console.log(message)
            return (
                <div key={index}>
                    {message.p2ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p1ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p2ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p2ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p2ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>}
                    {message.p1ActionStatement.statement ?
                    // The action had a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move and it had a print statement
                        <p className={classes.messageText}>
                            {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                        </p> :
                        // A move wasn't used
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move used dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                        <p className={classes.messageText}>{
                        // Prints the statement associated with the action
                        message.p1ActionStatement.statement}
                        </p>
                    </div> :
                    // The action didn't have a print statement
                    <div>
                        {message.p1ActionStatement.moveName ?
                        // The action was a move with no secondary effect
                        <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                        // The action was not a move
                        null}
                        {message.p1ActionStatement.damage ?
                        // The move dealt damage
                        <p className={classes.messageText}>It dealt {
                            message.p2ActionStatement.beastKOd ?
                            // The opposing beast was KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                            // The opposing beast was not KOd
                            `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                            }
                        </p> :
                        // The move was non-damaging
                        null}
                    </div>
                    }
                </div>
            )
        } else {
            return (
                <div key={index}>
                    <p className={classes.messageText}>Error reading last action based on Super Activation. Player 2 went first.</p>
                </div>
            )
        }
    } else {
        return (
            <div key={index}>
                <p className={classes.messageText}>Error reading first action.</p>
            </div>
        )
    }
}