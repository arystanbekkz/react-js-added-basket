import Modal from '@mui/material/Modal';
import {useCallback} from "react";
import {Button, Box, TextField, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { useForm } from "react-hook-form";

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    width: "100%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function BasketModal() {
    const openModal = useSelector((state) => state.shop.modalOpen);
    const dispatch = useDispatch();
    const handleCloseModal = useCallback(() => {
        reset();
        dispatch({type: 'shop/closeModal'})
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <Modal
            open={openModal}
            onClose={(event) => handleCloseModal(event)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section>
                        <h2>Order</h2>
                        <TextField
                            error={errors.name}
                            helperText={errors.name ? "Name should contain at least 3 letters." : ''}
                            fullWidth 
                            margin='dense'
                            variant="outlined"
                            label="Name"
                            placeholder='Name'
                            required
                            autoComplete='off'
                            aria-invalid={errors.name ? "true" : "false"}
                            {...register("name", {
                                required: true,
                                pattern: {
                                value: /[a-zA-Z]{3,}/,
                                message: "Entered value does not match name format"
                                }
                            })}
                        />

                        <TextField
                            error={errors.phone} 
                            helperText = {errors.phone ? 'Entered number does not match phone format' : ''}
                            fullWidth 
                            margin='dense'
                            variant="outlined"
                            label="Phone number"
                            type="tel"
                            placeholder='+77771234567'
                            required
                            autoComplete='off'
                            aria-invalid={errors.phone ? "true" : "false"}
                            {...register("phone", {
                                required: true,
                                pattern: {
                                value: /^\+?\d{11}$/,
                                message: "Entered value does not match phone format"
                                }
                            })}
                        />
                        
                        <TextField
                            error={errors.email}
                            helperText={errors.email ? "Entered value does not match email format" : ''} 
                            fullWidth 
                            margin='dense'
                            variant="outlined"
                            label="Email"
                            type="email"
                            placeholder='example@mail.com'
                            autoComplete='off'
                            aria-invalid={errors.email ? "true" : "false"}
                            {...register("email", {
                                required: false,
                                pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format"
                                }
                            })}
                        />

                        <TextField
                                error={errors.comment}
                                helperText={errors.comment ? "Comment should contain at least 10 symbols." : ''}
                                id="outlined-multiline-static"
                                label="Order comment"
                                multiline
                                rows={3}
                                margin='dense'
                                fullWidth
                                placeholder="Enter a comment to the order..."
                                aria-invalid={errors.comment ? "true" : "false"}
                                {...register("comment", {
                                    required: false,
                                    pattern: {
                                    value: /\S{10,}/,
                                    message: "Comment should contain at least 10 symbols."
                                    }
                                })}
                                />
                        <FormControl fullWidth sx={{marginTop: "10px"}} onClick={(e) => e.stopPropagation}>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="City"
                                {...register("city", {required: true})}
                            >
                                <MenuItem value={'Astana'}>Astana</MenuItem>
                                <MenuItem value={'Almaty'}>Almaty</MenuItem>
                                <MenuItem value={'Esil'}>Esil</MenuItem>
                            </Select>
                        </FormControl>
                    </section>
                    <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{marginTop: "20px"}}
                            >
                            Checkout
                        </Button>
                </form>
            </Box>
        </Modal>
    )

}
            