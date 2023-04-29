import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import Button from "../../Button";
import { useForm } from "react-hook-form";

export default function ProductTable({ products }) {
    const { register, handleSubmit, formState } = useForm({
        mode: "onChange"
      });

    const onSubmit = (data) => {
        console.log(formState);
    }
  return products?.map((product) => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        display="flex"
        marginBottom={4}
        justifyContent="space-between"
        rowGap={1}
        container
        key={product.id}
      >
        <Grid item xs={2}>
          <TextField
            type="text"
            label="id"
            defaultValue={product.id}
            variant="outlined"
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={9.9}>
          <TextField
            type="text"
            label="name"
            defaultValue={product.name}
            variant="outlined"
            focused
            inputProps={{ readOnly: false }}
            sx={{ width: "100%" }}
            {...register("name")}
          />
        </Grid>
        <Grid item xs={5.9}>
          <TextField
            type="text"
            label="createdAt"
            defaultValue={product.createdAt}
            variant="outlined"
            focused
            inputProps={{ readOnly: true }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={5.9}>
          <TextField
            type="text"
            label="updatedAt"
            defaultValue={product.updatedAt}
            variant="outlined"
            focused
            inputProps={{ readOnly: true }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            label="description"
            defaultValue={product.description.text}
            variant="outlined"
            focused
            inputProps={{ readOnly: false }}
            sx={{ width: "100%" }}
            multiline
            maxRows={4}
            {...register("description")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            label="shortDescription"
            defaultValue={product.shortDescription.text}
            variant="outlined"
            focused
            inputProps={{ readOnly: false }}
            sx={{ width: "100%" }}
            multiline
            maxRows={4}
            {...register("shortDescription")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            label="tag"
            defaultValue={product.tag}
            variant="outlined"
            focused
            inputProps={{ readOnly: false }}
            sx={{ width: "100%" }}
            multiline
            maxRows={2}
            {...register("tag")}
          />
        </Grid>
        <Grid item xs={5.9}>
          <TextField
            type="text"
            label="Views"
            defaultValue={product.views}
            variant="outlined"
            focused
            inputProps={{ readOnly: true }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={5.9}>
          <TextField
            type="text"
            label="Rating"
            defaultValue={product.rating}
            variant="outlined"
            focused
            inputProps={{ readOnly: true }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Button>Save</Button>
      </Grid>
    </form>
  ));
}
