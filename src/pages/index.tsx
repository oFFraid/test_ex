import React, {FC, useEffect, useMemo, useState} from 'react';
import {
    Box,
    Button, Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControl, FormControlLabel,
    FormGroup,
    ThemeProvider,
    Typography
} from "@mui/material";
import data from './../data.json'

export interface AnswerI {
    text: string;
    isTrue: boolean;
}


export interface QuestI {
    textQuest: string;
    answrs: AnswerI[];
}

const theme = createTheme();

interface QuestionProps {
    curObj: QuestI,
    curIdx: number
}

const CheckboxesGroup: FC<{
    answrs: AnswerI[]
}> = (props) => {
    const {
        answrs = []
    } = props
    const [state, setState] = useState<{ [index: number]: boolean }>({});

    useEffect(() => {
        setState({})
    }, [answrs]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <Box sx={{display: 'flex'}}>
            <FormControl
                sx={{m: 3}}
                component="fieldset"
                variant="standard"
            >
                <FormGroup>
                    {
                        answrs.map((el, i) => {
                            return <FormControlLabel
                                key={el.text + i}
                                control={
                                    <Checkbox
                                        color={el.isTrue && state[i] ? "success" : "error"}
                                        checked={state[i] || false}
                                        onChange={handleChange}
                                        name={i + ""}
                                    />
                                }
                                label={el.text}
                            />
                        })
                    }
                </FormGroup>
            </FormControl>
        </Box>
    );
}

const Question: FC<QuestionProps> = (props: QuestionProps) => {
    const {
        curObj,
        curIdx
    } = props;
    return <Box p={2}>
        <Typography
            pb={1}
            component={'h1'}
            variant="h5"
        >
            Вопрос {curIdx + 1} из {data.length}
        </Typography>
        <Typography
            component={'h1'}
            variant="h5"
        >
            {curObj.textQuest}
        </Typography>
        <CheckboxesGroup answrs={curObj.answrs}/>
    </Box>
}

function App() {
    const [curIdx, setCurIdx] = useState<number>(0);
    const curObj: QuestI = useMemo(() => data[curIdx], [curIdx]);
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={"lg"}>
                <CssBaseline/>
                <Box pt={4}>
                    <Button
                        onClick={() => {
                            setCurIdx(curIdx - 1 < 0
                                ? 0
                                : curIdx - 1
                            )
                        }}
                        disabled={curIdx - 1 < 0}
                    >
                        предыдущий
                    </Button>
                    <Button
                        onClick={() => {
                            setCurIdx(curIdx + 1)
                        }}
                        disabled={curIdx + 1 > data.length}
                    >
                        следующий
                    </Button>
                </Box>
                <Question
                    curIdx={curIdx}
                    curObj={curObj}
                />
            </Container>
        </ThemeProvider>
    )
}

// markup
const IndexPage = () => {
    return (
        <App/>
    )
}

export default IndexPage
